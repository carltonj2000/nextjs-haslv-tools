"use client";
import { Button } from "@/components/ui/button";
import { getHmembers, getStripe } from "./actions";
import { useFormState } from "react-dom";
import { format } from "date-fns";

const initialHmembers = null;
const initialStripers = null;

export default function Hmembers() {
  const [hmembers, hmembersAction] = useFormState(getHmembers, initialHmembers);
  console.log(
    hmembers ? !hmembers.err && hmembers.summary[0] : "No hmembers yet"
  );
  const [stripers, stripersAction] = useFormState(getStripe, initialStripers);
  return (
    <main>
      <div className="flex gap-2">
        <form action={hmembersAction}>
          <Button type="submit">Get Hmembers</Button>
        </form>
        <form action={stripersAction}>
          <Button type="submit">Get Stripe(rs)</Button>
        </form>
      </div>
      <div className="flex flex-row items-start gap-3">
        <table className="border">
          <tbody>
            {stripers &&
              !stripers.err &&
              stripers.data.map((s, i) => {
                return (
                  <tr key={i}>
                    <td>{s.name}</td>
                    <td>{s.amount}</td>
                    <td>{format(s.date, "yyyy-MM-dd")}</td>
                    <td>{s.email}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <table className="border">
          <tbody>
            {hmembers &&
              !hmembers.err &&
              hmembers.summary?.map((hm, i) => {
                return (
                  <tr key={i}>
                    <td>{hm.firstName}</td>
                    <td>{hm.lastName}</td>
                    <td>
                      {format(new Date(hm.waiverTimestamp), "yyyy-MM-dd")}
                    </td>
                    <td>{hm.email}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
