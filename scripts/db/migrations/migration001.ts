import { Kysely } from "kysely";

const TABLE = "user";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable(TABLE)
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("email", "text", (col) => col.notNull().unique())
    .addColumn("password", "text", (col) => col.notNull())
    .addColumn("salt", "text", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable(TABLE).execute();
}
