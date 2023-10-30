import { useState } from "react";
import * as v from "valibot";

interface Options<
  TSchema extends v.BaseSchema,
  TIn extends DeepPartial<v.Output<TSchema>>
> {
  defaultValue: TIn;

  validate: (
    x: TIn
  ) => [Errors<v.Output<TSchema>>, undefined] | [undefined, v.Output<TSchema>];
  onSubmit: (value: v.Output<TSchema> & TIn) => unknown | Promise<unknown>;
}

export const useForm = <
  TSchema extends v.BaseSchema,
  TIn extends DeepPartial<v.Output<TSchema>>
>({
  defaultValue,
  validate,
  onSubmit,
}: Options<TSchema, TIn>) => {
  type TOut = v.Output<TSchema>;

  const [errors, setErrors] = useState<Errors<TOut>>();
  const [state, setState] = useState<DeepPartial<TOut>>(defaultValue);

  const fieldProps = <T>(keys: ObjectPath<TOut>) => {
    let value: any = state;
    for (const k of keys ?? []) {
      value = value?.[k];
    }

    const setValue = (value: T | ((old: T) => T)) => {
      const newStateRoot = { ...state };

      let oldState: any = state;
      let newState: any = newStateRoot;

      for (const [i, k] of keys.map((k, i) => [i, k])) {
        console.log(k, value, oldState, newState);
        if (i === keys.length - 1) {
          newState[k] =
            typeof value === "function" ? (value as any)(oldState[k]) : value;
          break;
        }

        if (
          typeof oldState[k] === "string" ||
          typeof oldState[k] === "number" ||
          typeof oldState[k] === "boolean" ||
          typeof oldState[k] === "undefined" ||
          typeof oldState[k] === null
        ) {
          newState[k] = oldState[k];
        } else if (Array.isArray(oldState[k])) {
          newState[k] = [...oldState[k]];
        } else {
          newState[k] = { ...oldState[k] };
        }

        newState[k] ??= Object.is(+k, NaN) ? {} : [];
        oldState[k] ??= Object.is(+k, NaN) ? {} : [];

        newState = newState[k];
        oldState = oldState[k];
      }

      const [errors, output] = validate(newStateRoot);
      if (errors) {
        setState(newStateRoot);
        setErrors(errors);
      } else {
        setState(output as DeepPartial<TOut>);
        setErrors(undefined);
      }
    };

    return {
      value: value as T,
      setValue,
      onChange: (e: {
        target: { value: T; type?: string; checked?: boolean };
      }) => {
        if (e.target.type === "checkbox") {
          setValue(e.target.checked! as T);
        } else {
          setValue(e.target.value);
        }
      },
    };
  };

  const onSubmitHandler = async () => {
    if (!!errors) return;

    await onSubmit?.(state as any as TOut);
  };

  return {
    value: state,
    fieldProps,
    errors: errors,
    onSubmit: onSubmitHandler,
  };
};

export const mapValibotResult = <T extends v.BaseSchema>(
  result: v.SafeParseResult<T>
): [Errors<v.Output<T>>, undefined] | [undefined, v.Output<T>] => {
  if (!result.success) {
    const errors: any = {};
    for (const issue of result.issues) {
      let currentError: any = errors;
      for (const [i, seg] of (issue.path ?? []).map((s, i) => [i, s.key])) {
        if (!(seg in currentError)) currentError[seg] = {};
        if (i === issue.path?.length! - 1) {
          currentError[seg] = issue.message;
        } else {
          currentError = currentError[seg];
        }
      }
    }
    return [errors, undefined];
  } else {
    return [undefined, result.output];
  }
};

type ObjectPath<T> = T extends object
  ? T extends Blob
    ? never
    : {
        [K in keyof T]-?: ObjectPath<T[K]> extends never
          ? [K]
          : [K] | [K, ...ObjectPath<T[K]>];
      }[keyof T]
  : never;

export type Errors<T> = T extends string | number | boolean | Blob
  ? string
  : { [K in keyof T]?: Errors<T[K]> };

export type DeepPartial<T> = T extends
  | string
  | number
  | boolean
  | null
  | undefined
  // Blob
  | Blob
  ? T
  : { [K in keyof T]?: DeepPartial<T[K]> };
