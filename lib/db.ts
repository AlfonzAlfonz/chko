import { createKysely } from "@vercel/postgres-kysely";

interface Database {
  cities: ObecTable;
  admins: AdminTable;
}

export type ObecTable = {
  id: number;
  slug: string;
  metadata: ObecMetadata;
  data: ObecData;
};

export type ObecMetadata = {
  name: string;
  okres: string;
  kraj: string;
  position: [number, number];

  category: "I" | "II" | "III" | "IV";
  protectionZone: "A" | "B" | "C";
};

export type ObecData = {
  foundedYear: number;
  housesIn: Record<string, number[]>;

  terms: string[];

  links: [string, string][];

  cover: FigureData;
  characteristics: FigureData[];
  buildings: FigureData[];
};

export type FigureData = {
  caption: string;
  url: string;
};

export type AdminTable = {
  id: number;
  username: string;
  password_hash: string;
};

export const db = createKysely<Database>();
