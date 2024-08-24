"use client";
import { Button } from "@/components/ui/button";
import { mongo2pg } from "./actions";

export default function Mongo2pg() {
  return (
    <div>
      <Button onClick={() => mongo2pg()}>Mongo To Postgres</Button>
    </div>
  );
}
