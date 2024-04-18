import { FigureData, figureSchema } from "@/lib/figure";
import { number, optional, requiredSchema } from "@/lib/schemas";
import * as v from "valibot";

export type ObecTable = {
  id: number;
  slug: string;
  metadata: ObecMetadata;
  data: ObecData;
  published: boolean;

  chko: number;

  pdf: { url: string; uploadedAt: number } | null;
};

export type ObecMetadata = {
  name: string;
  okres: string;
  kraj: string;
  position: [number, number];

  category: ("I" | "II" | "III" | "IV")[];
  protectionZone: ("A" | "B" | "C")[];
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

  termsText?: string;
  termsButton?: [label?: string, link?: string];

  links: [label: string, link: string][];
};

export const obecScheme = v.object({
  published: v.boolean(),
  note: v.string(),
  metadata: v.object({
    name: v.string([requiredSchema]),
    okres: v.string([requiredSchema]),
    kraj: v.string([requiredSchema]),
    position: v.tuple([number(48.5, 51), number(12, 19)]),
    category: v.array(
      v.union([
        v.literal("I"),
        v.literal("II"),
        v.literal("III"),
        v.literal("IV"),
      ])
    ),
    protectionZone: v.array(
      v.union([v.literal("A"), v.literal("B"), v.literal("C")])
    ),
  }),
  data: v.object({
    foundedYear: optional(number()),
    censuses: v.array(
      v.tuple([optional(number()), optional(number()), optional(number())])
    ),
    cover: optional(figureSchema),
    intro: v.string([requiredSchema, v.maxLength(1380)]),
    characteristics: v.coerce(v.array(figureSchema, [v.maxLength(8)]), (x) =>
      Array.isArray(x) ? x.filter(Boolean) : []
    ),
    buildings: v.coerce(v.array(figureSchema, [v.maxLength(8)]), (x) =>
      Array.isArray(x) ? x.filter(Boolean) : []
    ),
    terms: v.array(v.string([requiredSchema])),
    termsText: v.string(),
    termsButton: optional(v.array(optional(v.string()))),
    links: v.array(
      v.tuple([
        v.string([requiredSchema]),
        v.string([requiredSchema, v.url("Špatný formát odkazu")]),
      ])
    ),
  }),
  chko: number(),
});
