import { FigureData, figureSchema } from "@/lib/figure";
import { number, optional, requiredSchema } from "@/lib/schemas";
import * as v from "valibot";

export type ChkoTable = {
  id: number;
  name: string;
  data: {
    kod?: number;
    position: [lat: number, long: number];

    list1: string[];

    list2: string[];

    figures: FigureData[];
  };
  published: boolean;
};

export const chkoScheme = v.object({
  name: v.string([v.minLength(1)]),
  data: v.object({
    kod: optional(number()),
    position: v.tuple([number(), number()]),
    list1: v.array(v.string([requiredSchema])),
    list2: v.array(v.string([requiredSchema])),

    figures: v.coerce(v.array(figureSchema, [v.maxLength(4)]), (x) =>
      Array.isArray(x) ? x.filter(Boolean) : []
    ),
  }),
  published: v.boolean(),
});
