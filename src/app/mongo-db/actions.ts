"use server";
import dbConnect from "@/lib/dbConnect";
import Hmember from "@/db/models/hmember";
import fs from "fs/promises";
import { getUsers, getUsersT } from "./users/actions";
import { db } from "@/db/database";

type getHmembersT =
  | {
      err: null;
      summary: {
        id: any;
        firstName: string;
        lastName: string;
        waiverTimestamp: string;
        email: string;
      }[];
    }
  | {
      err: 1;
      msg: string;
    };

export const getHmembers = async (): Promise<getHmembersT> => {
  await dbConnect();
  if (!global.mongoose || !global.mongoose.conn)
    return { err: 1, msg: "Failed to connect to DB!" };
  const results = await Hmember.find({}, [
    "firstName",
    "lastName",
    "waiverTimestamp",
    "email",
  ]).sort({ waiverTimestamp: -1 });
  const summary = results.map(
    ({ _id, firstName, lastName, waiverTimestamp, email }) => ({
      id: _id.toString(),
      firstName,
      lastName,
      waiverTimestamp,
      email,
    })
  );
  return { err: null, summary: summary.slice(0) };
};

const stripeFile =
  "/media/renderws/carltonData/cj2024/haslv/stripe/strip_payments202408_13Aug.csv";

type getStripeT =
  | {
      err: null;
      data: {
        name: string;
        amount: string;
        date: string;
        email: string;
      }[];
    }
  | {
      err: 1;
      msg: string;
    };

export const getStripe = async (): Promise<getStripeT> => {
  const exists = await fs.stat(stripeFile);
  if (!exists) return { err: 1, msg: "File does not exist" };
  const text = await fs.readFile(stripeFile);
  const lines = text.toString().trim().split("\n");
  const table = lines.map((l) => l.trim().split(","));
  const items = table[0].length;
  const errors = table.reduce(
    (errs, tr, i) =>
      tr.length === items
        ? errs
        : [...errs, `Line ${i}: Len ${tr.length} != ${items}`],
    []
  );

  if (errors.length) console.log({ errors });

  const result = table
    .slice(1)
    .map((r) => ({ name: r[3], amount: r[6], date: r[4], email: r[2] }));
  return { err: null, data: result };
};

export const usersPutPg = async (users: getUsersT) => {
  console.log("did not put users yet!");
  if (users.err) return users;
  const values = users.summary.map((s) => ({
    email: s.email,
    name: s.username,
    password: s.hash,
    salt: s.salt,
  }));
  const result = await db.insertInto("user").values(values).executeTakeFirst();
  console.log({ result });
  return result;
};

export const mongo2pg = async () => {
  console.log("Mongo To Postgres");
  const users = await getUsers();
  if (users.err) return users;
  const result = await usersPutPg(users);
  console.log({ result });
  return { status: "OK" };
};
