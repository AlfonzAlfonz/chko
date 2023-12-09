import { createKysely } from "@vercel/postgres-kysely";

interface Database {
  cities: ObecTable;
  admins: AdminTable;
  chkos: ChkoTable;
}

export type ObecTable = {
  id: number;
  slug: string;
  metadata: ObecMetadata;
  data: ObecData;
  published: boolean;
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
  /** Intro table */
  foundedYear?: number;
  /** Intro table */
  censuses: [year?: number, population?: number, houses?: number][];

  /** Intro */
  cover: FigureData;
  /** Intro */
  intro: string;

  /** Převažující charakter výstavby */
  characteristics: FigureData[];

  /**  Přítomnost památkově chráněných objektů */
  buildings: FigureData[];

  /** Podmínky ochrany a doplňující doporučení */
  terms: string[];

  links: [label: string, link: string][];
};

export type FigureData = {
  url: string;
  caption: string;
  width: number;
  height: number;
};

export type AdminTable = {
  id: number;
  username: string;
  password_hash: string;
};

export type ChkoTable = {
  id: number;
  name: string;
  data: {
    kod: number;
    position: [lat: number, long: number];
  };
};

export const db = createKysely<Database>();
