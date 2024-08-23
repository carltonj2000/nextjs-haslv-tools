import Link from "next/link";
import Hmembers from "./hmembers";

export default function MongoDb() {
  return (
    <main className="card">
      <h2>Mongo DB</h2>
      <div>
        <Link href="/mongo-db/users">Users</Link>
      </div>
      <Hmembers />
    </main>
  );
}
