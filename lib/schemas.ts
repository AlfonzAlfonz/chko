import * as v from "valibot";

export const normalizedOptional = <T extends v.BaseSchema>(x: T) =>
  v.coerce(v.union([v.undefinedType(), x]), (x) => {
    return x === "" || Object.is(x, NaN) || x === null
      ? undefined
      : typeof x === "string"
      ? x.trim()
      : x;
  });

export const number = (minValue?: number, maxValue?: number) => {
  if (minValue && maxValue)
    return v.coerce(
      v.number("Pole musí obsahovat číslo.", [
        v.minValue(minValue, `Hodnota nesmí být menší než ${minValue}`),
        v.maxValue(maxValue, `Hodnota nesmí být vyšší než ${maxValue}`),
      ]),
      Number
    );

  if (minValue)
    return v.coerce(
      v.number(`Hodnota nesmí být menší než ${minValue}`, [
        v.toMinValue(minValue),
      ]),
      Number
    );

  if (maxValue)
    return v.coerce(
      v.number(`Hodnota nesmí být vyšší než ${maxValue}`, [
        v.toMaxValue(maxValue),
      ]),
      Number
    );

  return v.coerce(v.number("Pole musí obsahovat číslo."), Number);
};

export const requiredSchema = v.minLength<string>(1, "Pole je povinné");
