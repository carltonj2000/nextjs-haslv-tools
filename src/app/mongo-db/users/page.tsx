import Users from "./users";
import Login from "./login";

export default function UsersPage() {
  return (
    <main className="card">
      <h2>Users</h2>
      <Users />
      <Login />
    </main>
  );
}
