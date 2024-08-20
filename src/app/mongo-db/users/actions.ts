"use server";
import dbConnect from "@/lib/dbConnect";
import User from "@/db/models/user";
import crypto from "crypto";

export const getUsers = async () => {
  await dbConnect();
  const results = await User.find({}, [
    "username",
    "hash",
    "salt",
    "email",
  ]).sort({
    email: 1,
  });
  const summary = results.map(({ _id, username, salt, hash, email }) => ({
    id: _id.toString(),
    username,
    salt,
    hash,
    email,
  }));
  console.log({ results: results[0], summary: summary[0] });
  return summary.slice(0);
};

export const loginUser = async (currentState: any, formData: FormData) => {
  console.log({ currentState, formData });
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();
  if (!formData || !username || !password)
    return console.log({ error: "Login data not found" });

  console.log({ username, password });
  await dbConnect();
  const result = await User.findOne({ username }, ["username", "hash", "salt"]);
  const hash = await hashPassword(password, result.salt);
  console.log({ result, hash });
  if (hash === result.hash) return { username };
  return { err: "invalid credentials" };
};

function hashPassword(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 25000, 512, "sha256", (err, key) => {
      if (err) reject(err);
      else resolve(key.toString("hex"));
    });
  });
}
