import client from "./mongodb";

export async function getDb(dbName?: string) {
  await client.connect();
  return client.db(dbName);
}
