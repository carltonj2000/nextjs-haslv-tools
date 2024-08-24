"use server";
import dbConnect from "@/lib/dbConnect";
import User from "@/db/models/user";
import crypto from "crypto";

export type getUsersT =
  | {
      err: 0;
      summary: {
        id: any;
        username: any;
        salt: any;
        hash: any;
        email: any;
      }[];
    }
  | {
      err: 1;
      msg: string;
    };

export const getUsers = async (): Promise<getUsersT> => {
  await dbConnect();
  if (!global.mongoose || !global.mongoose.conn)
    return { err: 1, msg: "Failed to connect to DB!" };

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
  return { err: 0, summary: summary.slice(0) };
};

type loginUserT =
  | { err: 0; username: string }
  | { err: 1; error: string }
  | { err: 2; error: any };

export const loginUser = async (
  currentState: any,
  formData: FormData
): Promise<loginUserT> => {
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();
  if (!formData || !username || !password) {
    const msg = { err: "Login data incomplete" };
    console.log(msg);
    return { err: 1, error: msg.err };
  }

  await dbConnect();
  const result = await User.findOne({ username }, ["username", "hash", "salt"]);
  let hash = "";
  try {
    hash = await hashPassword(password, result.salt);
  } catch (error) {
    return { err: 1, error: "error hashing password" };
  }
  if (hash === result.hash) return { err: 0, username };
  return { err: 1, error: "invalid credentials" };
};

function hashPassword(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 25000, 512, "sha256", (err, key) => {
      if (err) reject(err);
      else resolve(key.toString("hex"));
    });
  });
}
