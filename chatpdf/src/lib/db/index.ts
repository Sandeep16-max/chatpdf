import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

// Check for DATABASE_URL in environment
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL not found");

// Create a new PostgreSQL pool using the DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

// Initialize drizzle with the PostgreSQL pool
export const db = drizzle(pool);
