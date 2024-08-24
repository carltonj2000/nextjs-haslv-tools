"use client";
import { Button } from "@/components/ui/button";
import { getUsers } from "./actions";
import { useFormState } from "react-dom";

const initialUsers = null;

export default function Users() {
  const [users, usersAction] = useFormState(getUsers, initialUsers);
  return (
    <main>
      <div className="flex gap-2">
        <form action={usersAction}>
          <Button type="submit">Get Users</Button>
        </form>
      </div>
      {users && !users.err && (
        <div className="flex flex-row items-start gap-3">
          <p>Total: {users.summary.length}</p>
          <table className="border">
            <tbody>
              {users.summary.map((u, i) => {
                return (
                  <tr key={i}>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>{u.salt}</td>
                    <td>{u.hash}</td>
                  </tr>
                );
              })}
              ;
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
