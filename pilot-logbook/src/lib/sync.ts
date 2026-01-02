import { Database } from '@nozbe/watermelondb';
import NetInfo from '@react-native-community/netinfo';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://pilot-logbook-api.azurewebsites.net/api';

export interface SyncResult {
  success: boolean;
  pushed: number;
  pulled: number;
  errors: string[];
}

export class SyncService {
  private db: Database;
  private accessToken: string | null = null;
  private isSyncing = false;

  constructor(db: Database) {
    this.db = db;
  }

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  private async isOnline(): Promise<boolean> {
    const state = await NetInfo.fetch();
    return state.isConnected ?? false;
  }

  private async apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    if (!this.accessToken) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `API error: ${response.status}`);
    }

    return response.json();
  }

  async pushChanges(): Promise<{ pushed: number; errors: string[] }> {
    const syncQueue = this.db.get('sync_queue');
    const pendingChanges = await syncQueue.query().fetch();

    let pushed = 0;
    const errors: string[] = [];

    for (const change of pendingChanges) {
      try {
        const payload = JSON.parse((change as any).payloadJson);
        const operation = (change as any).operation;
        const tableName = (change as any).tableName;

        let endpoint = `/${tableName}`;
        let method = 'POST';

        if (operation === 'update') {
          endpoint = `/${tableName}/${payload.id}`;
          method = 'PUT';
        } else if (operation === 'delete') {
          endpoint = `/${tableName}/${payload.id}`;
          method = 'DELETE';
        }

        await this.apiRequest(endpoint, {
          method,
          body: operation !== 'delete' ? JSON.stringify(payload) : undefined,
        });

        // Remove from queue on success
        await this.db.write(async () => {
          await change.destroyPermanently();
        });

        pushed++;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        errors.push(`Failed to sync ${(change as any).tableName}: ${message}`);

        // Update attempt count
        await this.db.write(async () => {
          await change.update((record: any) => {
            record.attempts = (record.attempts || 0) + 1;
            record.lastError = message;
          });
        });
      }
    }

    return { pushed, errors };
  }

  async pullChanges(lastSyncTimestamp?: number): Promise<{ pulled: number }> {
    const since = lastSyncTimestamp || 0;

    // Pull each table
    const tables = ['aircraft', 'flight_entries', 'pilot_profile'];
    let pulled = 0;

    for (const tableName of tables) {
      try {
        const changes = await this.apiRequest<any[]>(
          `/${tableName}/changes?since=${since}`
        );

        if (changes.length > 0) {
          await this.db.write(async () => {
            const collection = this.db.get(tableName);

            for (const serverRecord of changes) {
              const existing = await collection
                .query()
                .fetch()
                .then((records) =>
                  records.find((r: any) => r.serverId === serverRecord.id)
                );

              if (existing) {
                // Update existing record
                await existing.update((record: any) => {
                  this.mapServerToLocal(record, serverRecord);
                  record.syncedAt = Date.now();
                });
              } else {
                // Create new record
                await collection.create((record: any) => {
                  this.mapServerToLocal(record, serverRecord);
                  record.serverId = serverRecord.id;
                  record.syncedAt = Date.now();
                });
              }
              pulled++;
            }
          });
        }
      } catch (error) {
        console.error(`Failed to pull ${tableName}:`, error);
      }
    }

    return { pulled };
  }

  private mapServerToLocal(local: any, server: any) {
    // Map server field names (camelCase) to local (snake_case)
    const fieldMap: Record<string, string> = {
      tailNumber: 'tail_number',
      typeRating: 'type_rating',
      isComplex: 'is_complex',
      isHighPerformance: 'is_high_performance',
      isTailwheel: 'is_tailwheel',
      isTurbine: 'is_turbine',
      isMultiEngine: 'is_multi_engine',
      userId: 'user_id',
      aircraftId: 'aircraft_id',
      departureAirport: 'departure_airport',
      arrivalAirport: 'arrival_airport',
      totalTime: 'total_time',
      picTime: 'pic_time',
      sicTime: 'sic_time',
      dualReceived: 'dual_received',
      dualGiven: 'dual_given',
      soloTime: 'solo_time',
      crossCountryTime: 'cross_country_time',
      nightTime: 'night_time',
      actualInstrumentTime: 'actual_instrument_time',
      simulatedInstrumentTime: 'simulated_instrument_time',
      dayLandings: 'day_landings',
      nightLandings: 'night_landings',
      dayFullStopLandings: 'day_full_stop_landings',
      nightFullStopLandings: 'night_full_stop_landings',
      instructorName: 'instructor_name',
      instructorCertNumber: 'instructor_cert_number',
      instructorSignature: 'instructor_signature',
      auth0Id: 'auth0_id',
      firstName: 'first_name',
      lastName: 'last_name',
      certificateNumber: 'certificate_number',
      certificateType: 'certificate_type',
      medicalClass: 'medical_class',
      medicalExpiry: 'medical_expiry',
      flightReviewDate: 'flight_review_date',
      defaultAircraftId: 'default_aircraft_id',
      homeAirport: 'home_airport',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    };

    for (const [serverKey, localKey] of Object.entries(fieldMap)) {
      if (server[serverKey] !== undefined) {
        local[localKey] = server[serverKey];
      }
    }

    // Handle JSON fields
    if (server.approaches) {
      local.approaches_json = JSON.stringify(server.approaches);
    }
    if (server.ratings) {
      local.ratings_json = JSON.stringify(server.ratings);
    }
  }

  async sync(): Promise<SyncResult> {
    if (this.isSyncing) {
      return { success: false, pushed: 0, pulled: 0, errors: ['Sync already in progress'] };
    }

    if (!(await this.isOnline())) {
      return { success: false, pushed: 0, pulled: 0, errors: ['No network connection'] };
    }

    this.isSyncing = true;
    const errors: string[] = [];

    try {
      // Push local changes first
      const pushResult = await this.pushChanges();
      errors.push(...pushResult.errors);

      // Then pull remote changes
      const pullResult = await this.pullChanges();

      return {
        success: errors.length === 0,
        pushed: pushResult.pushed,
        pulled: pullResult.pulled,
        errors,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, pushed: 0, pulled: 0, errors: [message] };
    } finally {
      this.isSyncing = false;
    }
  }
}
