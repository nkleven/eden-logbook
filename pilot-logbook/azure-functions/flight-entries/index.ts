import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { getContainer, CONTAINERS } from '../lib/cosmos';
import { verifyAuth, handleError } from '../lib/auth';
import { z } from 'zod';

const FlightEntryInput = z.object({
  id: z.string().uuid().optional(),
  date: z.string(),
  aircraftId: z.string().uuid(),
  departureAirport: z.string().length(4),
  arrivalAirport: z.string().length(4),
  route: z.string().optional(),
  totalTime: z.number().min(0),
  picTime: z.number().min(0).default(0),
  sicTime: z.number().min(0).default(0),
  dualReceived: z.number().min(0).default(0),
  dualGiven: z.number().min(0).default(0),
  soloTime: z.number().min(0).default(0),
  crossCountryTime: z.number().min(0).default(0),
  nightTime: z.number().min(0).default(0),
  actualInstrumentTime: z.number().min(0).default(0),
  simulatedInstrumentTime: z.number().min(0).default(0),
  dayLandings: z.number().int().min(0).default(0),
  nightLandings: z.number().int().min(0).default(0),
  dayFullStopLandings: z.number().int().min(0).default(0),
  nightFullStopLandings: z.number().int().min(0).default(0),
  approaches: z.array(z.object({
    type: z.string(),
    runway: z.string(),
    airport: z.string(),
    circleToLand: z.boolean().default(false),
  })).default([]),
  holds: z.number().int().min(0).default(0),
  remarks: z.string().optional(),
  instructorName: z.string().optional(),
  instructorCertNumber: z.string().optional(),
  instructorSignature: z.string().optional(),
});

async function handler(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    const auth = await verifyAuth(request);
    const container = await getContainer(CONTAINERS.FLIGHT_ENTRIES);
    const method = request.method.toUpperCase();

    // GET - List flight entries
    if (method === 'GET') {
      const since = request.query.get('since');
      const limit = parseInt(request.query.get('limit') || '100', 10);

      let query = 'SELECT * FROM c WHERE c.userId = @userId';
      const parameters: { name: string; value: any }[] = [
        { name: '@userId', value: auth.userId },
      ];

      if (since) {
        query += ' AND c.updatedAt > @since';
        parameters.push({ name: '@since', value: parseInt(since, 10) });
      }

      query += ' ORDER BY c.date DESC OFFSET 0 LIMIT @limit';
      parameters.push({ name: '@limit', value: limit });

      const { resources } = await container.items.query({
        query,
        parameters,
      }).fetchAll();

      return { status: 200, jsonBody: resources };
    }

    // POST - Create flight entry
    if (method === 'POST') {
      const body = await request.json();
      const parsed = FlightEntryInput.parse(body);
      
      const now = Date.now();
      const entry = {
        ...parsed,
        id: parsed.id || crypto.randomUUID(),
        userId: auth.userId,
        createdAt: now,
        updatedAt: now,
      };

      const { resource } = await container.items.create(entry);
      return { status: 201, jsonBody: resource };
    }

    // PUT - Update flight entry
    if (method === 'PUT') {
      const id = request.params.id;
      if (!id) {
        return { status: 400, jsonBody: { error: 'Missing id parameter' } };
      }

      const body = await request.json();
      const parsed = FlightEntryInput.parse(body);

      // Verify ownership
      const { resource: existing } = await container.item(id, auth.userId).read();
      if (!existing) {
        return { status: 404, jsonBody: { error: 'Flight entry not found' } };
      }

      const updated = {
        ...existing,
        ...parsed,
        id,
        userId: auth.userId,
        updatedAt: Date.now(),
      };

      const { resource } = await container.item(id, auth.userId).replace(updated);
      return { status: 200, jsonBody: resource };
    }

    // DELETE - Soft delete flight entry
    if (method === 'DELETE') {
      const id = request.params.id;
      if (!id) {
        return { status: 400, jsonBody: { error: 'Missing id parameter' } };
      }

      const { resource: existing } = await container.item(id, auth.userId).read();
      if (!existing) {
        return { status: 404, jsonBody: { error: 'Flight entry not found' } };
      }

      // Soft delete
      const deleted = {
        ...existing,
        deletedAt: Date.now(),
        updatedAt: Date.now(),
      };

      await container.item(id, auth.userId).replace(deleted);
      return { status: 204 };
    }

    return { status: 405, jsonBody: { error: 'Method not allowed' } };
  } catch (error) {
    context.error('Flight entries error:', error);
    
    if (error instanceof z.ZodError) {
      return { status: 400, jsonBody: { error: 'Validation failed', details: error.errors } };
    }
    
    return handleError(error);
  }
}

app.http('flight-entries', {
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  route: 'flight-entries/{id?}',
  handler,
});

// Changes endpoint for sync
app.http('flight-entries-changes', {
  methods: ['GET'],
  route: 'flight-entries/changes',
  handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    try {
      const auth = await verifyAuth(request);
      const container = await getContainer(CONTAINERS.FLIGHT_ENTRIES);
      const since = parseInt(request.query.get('since') || '0', 10);

      const { resources } = await container.items.query({
        query: 'SELECT * FROM c WHERE c.userId = @userId AND c.updatedAt > @since ORDER BY c.updatedAt ASC',
        parameters: [
          { name: '@userId', value: auth.userId },
          { name: '@since', value: since },
        ],
      }).fetchAll();

      return { status: 200, jsonBody: resources };
    } catch (error) {
      context.error('Flight entries changes error:', error);
      return handleError(error);
    }
  },
});
