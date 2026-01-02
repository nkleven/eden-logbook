import { CosmosClient, Container, Database } from '@azure/cosmos';

const endpoint = process.env.COSMOS_ENDPOINT || '';
const key = process.env.COSMOS_KEY || '';
const databaseId = process.env.COSMOS_DATABASE || 'pilot-logbook';

let client: CosmosClient | null = null;
let database: Database | null = null;
const containers: Map<string, Container> = new Map();

export function getCosmosClient(): CosmosClient {
  if (!client) {
    if (!endpoint || !key) {
      throw new Error('Cosmos DB configuration missing');
    }
    client = new CosmosClient({ endpoint, key });
  }
  return client;
}

export async function getDatabase(): Promise<Database> {
  if (!database) {
    const cosmosClient = getCosmosClient();
    const { database: db } = await cosmosClient.databases.createIfNotExists({
      id: databaseId,
    });
    database = db;
  }
  return database;
}

export async function getContainer(containerId: string): Promise<Container> {
  if (!containers.has(containerId)) {
    const db = await getDatabase();
    const { container } = await db.containers.createIfNotExists({
      id: containerId,
      partitionKey: { paths: ['/userId'] },
    });
    containers.set(containerId, container);
  }
  return containers.get(containerId)!;
}

// Container names
export const CONTAINERS = {
  FLIGHT_ENTRIES: 'flight-entries',
  AIRCRAFT: 'aircraft',
  PILOT_PROFILES: 'pilot-profiles',
} as const;
