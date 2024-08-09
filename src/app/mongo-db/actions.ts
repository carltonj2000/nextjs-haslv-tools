"use server";
import dbConnect from "@/lib/dbConnect";
import Hmember from "@/db/models/hmember";

export const getHmembers = async () => {
  await dbConnect();
  const results = await Hmember.find({}, [
    "firstName",
    "lastName",
    "waiverTimestamp",
  ]).sort({ waiverTimestamp: -1 });
  const summary = results.map(
    ({ _id, firstName, lastName, waiverTimestamp }) => ({
      id: _id.toString(),
      firstName,
      lastName,
      waiverTimestamp,
    })
  );
  console.log({ result: results[0] });
  console.log({ summary: summary.slice(1, 4) });
  // return [{ firstName: "Carlton" }];
  return summary.slice(1, 4);
};
