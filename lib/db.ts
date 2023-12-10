import { ChkoTable } from "@/lib/chko";
import { ObecTable } from "@/lib/obec";
import { createKysely } from "@vercel/postgres-kysely";

interface Database {
  cities: ObecTable;
  admins: AdminTable;
  chkos: ChkoTable;
}

export type AdminTable = {
  id: number;
  username: string;
  password_hash: string;
};

export const db = createKysely<Database>();
