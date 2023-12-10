import { FigureData, figureSchema } from "@/lib/figure";
import { number, requiredSchema } from "@/lib/schemas";
import * as v from "valibot";

export type ChkoTable = {
  id: number;
  name: string;
  data: {
    kod: number;
    position: [lat: number, long: number];

    list1Title: string;
    list1: string[];

    list2Title: string;
    list2: string[];

    figures: FigureData[];
  };
};

export const chkoScheme = v.object({
  name: v.string(),
  data: v.object({
    kod: number(),
    position: v.tuple([number(), number()]),
    list1Title: v.string([requiredSchema]),
    list1: v.array(v.string([requiredSchema])),
    list2Title: v.string([requiredSchema]),
    list2: v.array(v.string([requiredSchema])),

    figures: v.coerce(
      v.array(figureSchema, [v.maxLength(4), v.minLength(4)]),
      (x) => (Array.isArray(x) ? x.filter(Boolean) : [])
    ),
  }),
});
