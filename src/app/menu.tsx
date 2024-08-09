import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, MenuIcon, DatabaseIcon } from "lucide-react";
import Link from "next/link";

export default function Menu() {
  return (
    <div className="flex bg-red-100 justify-between items-center px-3 py-4">
      <Link href={`/`} className="flex gap-3">
        <Home size={36} />
        <h2>HASLV Tools</h2>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MenuIcon size={36} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href={`/`} className="flex gap-3">
              <Home size={24} />
              Home
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/mongo-db`} className="flex gap-3">
              <DatabaseIcon size={24} />
              Mongo DB
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
