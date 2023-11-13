"use client";

import { useRouter } from "next/navigation";
import { AutocompleteInnerProps, Autocomplete } from "./Autocomplete";
import { useContext } from "react";
import { ObecListContext } from "../contexts";

export const ObecSearch = (props: {
  options?: { value: number; label: string; slug: string }[];
  inner?: AutocompleteInnerProps;
  searchDecorator?: boolean;
  onChange?: () => unknown;
  onInputChange?: (val: string) => unknown;
}) => {
  const obecList = useContext(ObecListContext);
  const router = useRouter();

  return (
    <Autocomplete
      {...props}
      options={obecList.map((o) => ({
        value: o.id,
        label: o.metadata.name,
        slug: o.slug,
      }))}
      onChange={(_, val) => {
        if (!val) return;

        router.push(`/obec/${val.value}/${val.slug}`);
        props.onChange?.();
      }}
      onInputChange={(_, val) => {
        props.onInputChange?.(val);
      }}
    />
  );
};
