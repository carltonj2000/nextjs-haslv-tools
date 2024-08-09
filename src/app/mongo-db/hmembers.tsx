"use client";
import { Button } from "@/components/ui/button";
import { getHmembers } from "./actions";
import { useFormState } from "react-dom";

const initialHmembers = null;

export default function Hmembers() {
  const [hmembers, formAction] = useFormState(getHmembers, initialHmembers);
  console.log(hmembers);
  return (
    <main>
      <h3>Hmembers</h3>
      <form action={formAction}>
        <Button type="submit">Get Hmembers</Button>
      </form>
      <table>
        <tbody>
          {hmembers?.map((hm, i) => {
            return (
              <tr key={i}>
                <td>{hm.firstName}</td>
                <td>{hm.lastName}</td>
                {/* <td>{hm.waiverTimestamp}</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
