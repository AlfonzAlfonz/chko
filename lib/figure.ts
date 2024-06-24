import { normalizedOptional } from "@/lib/schemas";
import * as v from "valibot";

export type FigureData = {
  url: string;
  caption: string;
  width: number;
  height: number;
};

export const figureSchema = v.object({
  caption: v.union([v.string(), v.undefinedType()]),
  blob: v.union([v.undefinedType(), v.blob()]),
  url: v.string(),
  width: normalizedOptional(v.number()),
  height: normalizedOptional(v.number()),
});
