import "server-only";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (!databaseUrl) {
    throw new Error(
      "Grant+ database is unavailable. Set DATABASE_URL or POSTGRES_URL.",
    );
  }

  return drizzle(databaseUrl, { schema });
}
