import { useState } from "react";
import * as v from "valibot";

interface Options<TIn, TOut extends TIn, TSchema extends v.BaseSchema> {
  defaultValue: TIn;
  scheme: TSchema;

  onSubmit: (value: TOut) => unknown | Promise<unknown>;
}

export const useForm = <
  TScheme extends v.BaseSchema,
  TIn,
  TOut extends v.Output<TScheme> & TIn
>({
  defaultValue,
  scheme,
  onSubmit,
}: Options<TIn, TOut, TScheme>) => {
  const [errors, setErrors] = useState<Errors<TOut>>();
  const [state, setState] = useState<TIn>(defaultValue);

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

        newState = newState[k];
        oldState = oldState[k];
      }

      const s = v.safeParse<TScheme>(scheme, newStateRoot);
      if (!s.success) {
        setState(newStateRoot);
        const errors: any = {};
        for (const issue of s.issues) {
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
        setErrors(errors);
      } else {
        setState(s.output);
        setErrors(undefined);
      }
    };

    return {
      value: value as T,
      setValue,
      onChange: (e: { target: { value: T } }) => {
        setValue(e.target.value);
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

type ObjectPath<T> = T extends object
  ? T extends File
    ? never
    : {
        [K in keyof T]-?: ObjectPath<T[K]> extends never
          ? [K]
          : [K] | [K, ...ObjectPath<T[K]>];
      }[keyof T]
  : never;

type Errors<T> = T extends string | number | boolean
  ? string
  : { [K in keyof T]?: Errors<T[K]> };
