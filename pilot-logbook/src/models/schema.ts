import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'aircraft',
      columns: [
        { name: 'tail_number', type: 'string', isIndexed: true },
        { name: 'make', type: 'string' },
        { name: 'model', type: 'string' },
        { name: 'category', type: 'string' },
        { name: 'class', type: 'string' },
        { name: 'type_rating', type: 'string', isOptional: true },
        { name: 'is_complex', type: 'boolean' },
        { name: 'is_high_performance', type: 'boolean' },
        { name: 'is_tailwheel', type: 'boolean' },
        { name: 'is_turbine', type: 'boolean' },
        { name: 'is_multi_engine', type: 'boolean' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
        { name: 'synced_at', type: 'number', isOptional: true },
        { name: 'server_id', type: 'string', isOptional: true, isIndexed: true },
      ],
    }),
    tableSchema({
      name: 'flight_entries',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'date', type: 'number', isIndexed: true },
        { name: 'aircraft_id', type: 'string', isIndexed: true },
        { name: 'departure_airport', type: 'string' },
        { name: 'arrival_airport', type: 'string' },
        { name: 'route', type: 'string', isOptional: true },
        
        // Times
        { name: 'total_time', type: 'number' },
        { name: 'pic_time', type: 'number' },
        { name: 'sic_time', type: 'number' },
        { name: 'dual_received', type: 'number' },
        { name: 'dual_given', type: 'number' },
        { name: 'solo_time', type: 'number' },
        { name: 'cross_country_time', type: 'number' },
        { name: 'night_time', type: 'number' },
        { name: 'actual_instrument_time', type: 'number' },
        { name: 'simulated_instrument_time', type: 'number' },
        
        // Landings
        { name: 'day_landings', type: 'number' },
        { name: 'night_landings', type: 'number' },
        { name: 'day_full_stop_landings', type: 'number' },
        { name: 'night_full_stop_landings', type: 'number' },
        
        // Approaches stored as JSON string
        { name: 'approaches_json', type: 'string' },
        { name: 'holds', type: 'number' },
        
        // Remarks
        { name: 'remarks', type: 'string', isOptional: true },
        { name: 'instructor_name', type: 'string', isOptional: true },
        { name: 'instructor_cert_number', type: 'string', isOptional: true },
        { name: 'instructor_signature', type: 'string', isOptional: true },
        
        // Sync
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
        { name: 'synced_at', type: 'number', isOptional: true },
        { name: 'server_id', type: 'string', isOptional: true, isIndexed: true },
      ],
    }),
    tableSchema({
      name: 'pilot_profile',
      columns: [
        { name: 'auth0_id', type: 'string', isIndexed: true },
        { name: 'email', type: 'string' },
        { name: 'first_name', type: 'string' },
        { name: 'last_name', type: 'string' },
        { name: 'certificate_number', type: 'string', isOptional: true },
        { name: 'certificate_type', type: 'string', isOptional: true },
        { name: 'ratings_json', type: 'string' },
        { name: 'medical_class', type: 'string', isOptional: true },
        { name: 'medical_expiry', type: 'number', isOptional: true },
        { name: 'flight_review_date', type: 'number', isOptional: true },
        { name: 'default_aircraft_id', type: 'string', isOptional: true },
        { name: 'home_airport', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
        { name: 'synced_at', type: 'number', isOptional: true },
        { name: 'server_id', type: 'string', isOptional: true },
      ],
    }),
    tableSchema({
      name: 'sync_queue',
      columns: [
        { name: 'table_name', type: 'string', isIndexed: true },
        { name: 'record_id', type: 'string', isIndexed: true },
        { name: 'operation', type: 'string' }, // 'create' | 'update' | 'delete'
        { name: 'payload_json', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'attempts', type: 'number' },
        { name: 'last_error', type: 'string', isOptional: true },
      ],
    }),
  ],
});
