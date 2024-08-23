import { Database } from "./types"; // this is the Database interface we defined earlier
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { config } from "dotenv";
config({ path: ".env.local" });

const dialect = new PostgresDialect({
  pool: new Pool({
    database: "postgres",
    host: "localhost",
    user: "postgres",
    password: process.env.POSTGRES_PW,
    port: 5432,
    max: 10,
  }),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
});
