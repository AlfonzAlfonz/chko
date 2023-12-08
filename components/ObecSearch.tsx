"use client";

import Autocomplete, { AutocompleteProps } from "@mui/joy/Autocomplete";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { ConciseObec, ObecListContext } from "./contexts";

export const ObecSearch = ({
  onChange,
  className,
  slotProps: _slotProps,
  defaultId,
  ...props
}: Partial<AutocompleteProps<ConciseObec, false, false, false>> & {
  defaultId?: number;
}) => {
  const ref = useRef();
  const obecList = useContext(ObecListContext);
  const router = useRouter();

  const slotProps:
    | { [K in keyof NonNullable<typeof _slotProps>]?: any }
    | undefined = _slotProps;

  return (
    <Autocomplete
      options={obecList}
      name="search"
      getOptionLabel={(o) => o.metadata.name}
      placeholder="VYHLEDAT OBEC"
      className={twMerge("!rounded-full", className)}
      autoComplete
      defaultValue={
        defaultId ? obecList.find((o) => o.id === defaultId) : undefined
      }
      isOptionEqualToValue={(a, b) => a.id === b.id}
      startDecorator={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <circle
            cx="5"
            cy="5"
            r="4.25"
            stroke="black"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
          <line
            x1="8.53033"
            y1="8.46967"
            x2="12.7656"
            y2="12.705"
            stroke="black"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
        </svg>
      }
      noOptionsText="K dispozici nejsou žádné obce"
      slotProps={{
        ...slotProps,
        input: {
          className: twMerge("outline-none", slotProps?.input?.className),
        },
        listbox: {
          className: twMerge("rounded-none", slotProps?.listbox?.className),
        },
      }}
      onChange={(...args) => {
        onChange?.(...args);
        const [, o] = args;
        if (!o) return;

        router.push(`/obec/${o.id}/${o.slug}`);
      }}
      {...props}
    />
  );
};
