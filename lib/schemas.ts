import * as v from "valibot";

export const requiredSchema = v.minLength<string>(1, "Pole je povinné");

export const figureSchema = v.object({
  caption: v.string(),
  blob: v.union([v.undefinedType(), v.blob()]),
  url: v.string(),
  width: v.number(),
  height: v.number(),
});

export const obecScheme = v.object({
  published: v.boolean(),
  metadata: v.object({
    name: v.string([requiredSchema]),
    okres: v.string([requiredSchema]),
    kraj: v.string([requiredSchema]),
    position: v.tuple([
      v.coerce(v.number(), Number),
      v.coerce(v.number(), Number),
    ]),
    category: v.union([
      v.literal("I"),
      v.literal("II"),
      v.literal("III"),
      v.literal("IV"),
    ]),
    protectionZone: v.union([v.literal("A"), v.literal("B"), v.literal("C")]),
  }),
  data: v.object({
    foundedYear: v.number(),
    censuses: v.array(v.tuple([v.number(), v.number(), v.number()])),
    cover: figureSchema,
    intro: v.string([requiredSchema]),
    characteristics: v.coerce(v.array(figureSchema, [v.maxLength(8)]), (x) =>
      Array.isArray(x) ? x.filter(Boolean) : []
    ),
    buildings: v.coerce(v.array(figureSchema, [v.maxLength(8)]), (x) =>
      Array.isArray(x) ? x.filter(Boolean) : []
    ),
    terms: v.array(v.string([requiredSchema])),
    links: v.array(
      v.tuple([
        v.string([requiredSchema]),
        v.string([requiredSchema, v.url("Špatný formát odkazu")]),
      ])
    ),
  }),
});
