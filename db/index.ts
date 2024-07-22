import { drizzle } from "drizzle-orm/d1";
import { getRequestContext } from "@cloudflare/next-on-pages";
import * as schema from "@/db/schema";

// Database instance, initially null
let dbInstance: ReturnType<typeof drizzle> | null = null;

/**
 * Initializes the database instance if it hasn't been initialized yet.
 * @returns The database instance.
 */
function initializeDb(): NonNullable<ReturnType<typeof drizzle>> {
  if (!dbInstance) {
    try {
      const context = getRequestContext().env.DB;
      dbInstance = drizzle(context, { schema });
    } catch (error) {
      console.error("Error initializing database:", error);
      throw error;
    }
  }
  return dbInstance as NonNullable<ReturnType<typeof drizzle>>;
}

// Proxy to handle lazy initialization of the database instance
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get: function (target, prop, receiver) {
    const instance = initializeDb();
    return Reflect.get(instance, prop, receiver);
  },
});
