"use server";
import dbConnect from "@/lib/dbConnect";
import Hmember from "@/db/models/hmember";
import fs from "fs/promises";

export const getHmembers = async () => {
  await dbConnect();
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
  return summary.slice(0);
};

const stripeFile =
  "/media/renderws/carltonData/cj2024/haslv/stripe/strip_payments202408_13Aug.csv";
export const getStripe = async () => {
  const exists = await fs.stat(stripeFile);
  if (!exists)
    return [{ name: "File does not exist", amount: 20, date: Date.now() }];
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
  else console.log(table[0].join(","));
  const result = table
    .slice(1)
    .map((r) => ({ name: r[3], amount: r[6], date: r[4], email: r[2] }));
  return result;
};
