"use client";

import { Popper } from "@mui/base/Popper";
import {
  useAutocomplete,
  UseAutocompleteProps,
} from "@mui/base/useAutocomplete";
import { unstable_useForkRef as useForkRef } from "@mui/utils";
import * as React from "react";

export const Autocomplete = React.forwardRef(function Autocomplete(
  props: UseAutocompleteProps<
    { label: string; value: number; slug: string },
    false,
    false,
    false
  >,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { disabled = false, readOnly = false, ...other } = props;

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    id,
    popupOpen,
    focused,
    anchorEl,
    setAnchorEl,
    groupedOptions,
  } = useAutocomplete({
    ...props,
    componentName: "BaseAutocompleteIntroduction",
  });

  const rootRef = useForkRef(ref, setAnchorEl);

  return (
    <React.Fragment>
      <div
        {...getRootProps(other)}
        ref={rootRef}
        className={`flex gap-2 w-full ${focused ? "focused" : undefined}`}
      >
        <input
          className="search"
          type="text"
          placeholder="Vyhledávání"
          id={id}
          {...getInputProps()}
        />
      </div>
      {anchorEl ? (
        <Popper
          open={popupOpen}
          anchorEl={anchorEl}
          slots={{
            root: "div",
          }}
          slotProps={{
            root: {
              className: "relative z-[1001] w-[60vw]",
            },
          }}
          modifiers={[
            { name: "flip", enabled: false },
            { name: "preventOverflow", enabled: false },
          ]}
        >
          <ul
            className="overflow-auto outline-none bg-white"
            {...getListboxProps()}
          >
            {(
              groupedOptions as { value: number; label: string; slug: string }[]
            ).map((option, index) => {
              const optionProps = getOptionProps({
                option,
                index,
              });

              return (
                // eslint-disable-next-line react/jsx-key
                <li className="bg-white text-xl px-2 py-4" {...optionProps}>
                  {option.label}
                </li>
              );
            })}

            {groupedOptions.length === 0 && (
              <li className="cursor-default">No results</li>
            )}
          </ul>
        </Popper>
      ) : null}
    </React.Fragment>
  );
});
