"use client";
import { Button } from "@/components/ui/button";
import { loginUser } from "./actions";
import { useFormState } from "react-dom";

const initialUsers = null;

export default function Users() {
  const [user, loginAction] = useFormState(loginUser, initialUsers);
  return (
    <>
      <form action={loginAction}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <Button type="submit">Login</Button>
      </form>
      {user && user.err && <p>{user.err}</p>}
      {user && user.username && <p>{user.username}</p>}
    </>
  );
}
