import minimist from "minimist";
import { db } from "@/db/database";
import { up as up001, down as down001 } from "./migrations/migration001";
import type { Kysely } from "kysely";

interface MigrateUdI {
  migrationNo: number;
  up: (db: Kysely<any>) => Promise<void>;
  down: (db: Kysely<any>) => Promise<void>;
}
const uds: Array<MigrateUdI> = [{ migrationNo: 1, up: up001, down: down001 }];

async function main() {
  const argv = minimist(process.argv.slice(2), {
    boolean: ["d", "u"],
  });

  const u = argv["u"];
  const d = argv["d"];
  if (!u && !d) {
    console.log("Please enter either -u or -d.");
    process.exit(-1);
  }
  const mNo = argv["_"];
  if (mNo.length === 0 || mNo.length !== 1 || typeof mNo[0] !== "number") {
    console.log("Please a single migration number");
    process.exit(-1);
  }

  const mNoN = parseInt(mNo[0]);
  const migrationNo = String(mNoN).padStart(3, "0");

  const migrationFn = uds.find((ud) => ud.migrationNo === mNoN);
  if (!migrationFn) {
    console.log("Invalid migration specified");
    process.exit(-1);
  }

  if (d) await migrationFn.down(db);
  else {
    if (u) await migrationFn.up(db);
    else {
      console.log("Programming error! Should never get here.");
      process.exit(-1);
    }
  }
}

console.log("migration running ...");
main()
  .catch((err) => console.log("migration error!", err))
  .finally(() => console.log("migration finished!"));
