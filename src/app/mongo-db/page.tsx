import Link from "next/link";
import Hmembers from "./hmembers";
import Mongo2pg from "./mongo2pg";

export default function MongoDb() {
  return (
    <main className="card">
      <h2>Mongo DB</h2>
      <div>
        <Link href="/mongo-db/users" className="underline text-blue-400">
          Users
        </Link>
      </div>
      <Hmembers />
      <Mongo2pg />
    </main>
  );
}
