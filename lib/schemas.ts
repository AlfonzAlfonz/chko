import * as v from "valibot";

export const optional = <T extends v.BaseSchema, U extends v.BaseSchema>(
  x: T
) => v.union([v.undefinedType(), x]);

export const number = () => v.coerce(v.number(), Number);

export const requiredSchema = v.minLength<string>(1, "Pole je povinné");
