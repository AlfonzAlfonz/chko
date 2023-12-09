import * as v from "valibot";

const optional = <T extends v.BaseSchema>(x: T) =>
  v.union([v.undefinedType(), x]);

const number = () => v.coerce(v.number(), Number);

export const requiredSchema = v.minLength<string>(1, "Pole je povinné");

export const figureSchema = v.object({
  caption: v.union([v.string(), v.undefinedType()]),
  blob: v.union([v.undefinedType(), v.blob()]),
  url: v.string(),
});

export const obecScheme = v.object({
  published: v.boolean(),
  metadata: v.object({
    name: v.string([requiredSchema]),
    okres: v.string([requiredSchema]),
    kraj: v.string([requiredSchema]),
    position: v.tuple([number(), number()]),
    category: v.union([
      v.literal("I"),
      v.literal("II"),
      v.literal("III"),
      v.literal("IV"),
    ]),
    protectionZone: v.union([v.literal("A"), v.literal("B"), v.literal("C")]),
  }),
  data: v.object({
    foundedYear: optional(number()),
    censuses: v.array(
      v.tuple([optional(number()), optional(number()), optional(number())])
    ),
    cover: optional(figureSchema),
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

const getImageSize = (blob: Blob) =>
  new Promise<[number, number] | null>((resolve) => {
    const img = document.createElement("img");

    img.onload = () => {
      resolve([img.naturalWidth, img.naturalHeight]);
      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
      resolve(null);
      URL.revokeObjectURL(img.src);
    };

    img.src = URL.createObjectURL(blob);
  });
