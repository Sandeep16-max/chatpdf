import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

console.log("DATABASE_URL: ", process.env.DATABASE_URL);

export default {
  driver: "pg",
  schema: "./src/lib/db/schema.ts",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;

// npx drizzle-kit push:pg
