"use client";

import Autocomplete, {
  AutocompleteProps,
  createFilterOptions,
} from "@mui/joy/Autocomplete";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ConciseObec, ObecListContext } from "./contexts";

export const ObecSearch = ({
  onChange,
  className,
  slotProps: _slotProps,
  onInputChange,
  defaultId,
  ...props
}: Partial<AutocompleteProps<ConciseObec, false, false, false>> & {
  defaultId?: number;
}) => {
  const obecList = useContext(ObecListContext).sort((a, b) =>
    a.metadata.name.localeCompare(b.metadata.name)
  );
  const router = useRouter();

  const [inputValue, setInputValue] = useState("");

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
      inputValue={inputValue}
      filterOptions={filterOptions}
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
        option: {
          className:
            "!uppercase hover:!bg-transparent hover:text-black hover:underline tracking-[2.2px]",
        },
        noOptions: {
          className:
            "!uppercase hover:!bg-transparent hover:text-black hover:underline tracking-[2.2px]",
        },
      }}
      onChange={(...args) => {
        onChange?.(...args);
        const [, o] = args;
        if (!o) return;

        router.push(`/obec/${o.id}/${o.slug}`);
      }}
      onInputChange={(...args) => {
        setInputValue(args[1]);
        onInputChange?.(...args);
      }}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          const filtered = filterOptions(obecList, {
            inputValue,
            getOptionLabel: (o) => o.metadata.name,
          });
          const o = filtered[0];
          if (o) router.push(`/obec/${o.id}/${o.slug}`);
        }
      }}
      {...props}
    />
  );
};

export const filterOptions = createFilterOptions<ConciseObec>({});
