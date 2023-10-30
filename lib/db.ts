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
  foundedYear: number;
  /** Intro table */
  censuses: [year: number, population: number, houses: number][];

  /** Intro */
  cover: FigureData;
  /** Intro */
  intro: string;

  /** Převažující charakter výstavby */
  characteristics: [
    FigureData | undefined,
    FigureData | undefined,
    FigureData | undefined
  ];

  /**  Přítomnost památkově chráněných objektů */
  buildings: [
    FigureData | undefined,
    FigureData | undefined,
    FigureData | undefined
  ];

  /** Podmínky ochrany a doplňující doporučení */
  terms: string[];

  links: [string, string][];
};

export type FigureData = {
  url: string;
  caption: string;
};

export type AdminTable = {
  id: number;
  username: string;
  password_hash: string;
};

export const db = createKysely<Database>();
