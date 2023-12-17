"use client";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { ObecSearch, filterOptions } from "./ObecSearch";
import { ObecListContext } from "./contexts";
import Link from "next/link";

export const HomepageSearch = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const obecList = useContext(ObecListContext);

  return (
    <div className="max-w-full">
      <ObecSearch
        onChange={() => setLoading(true)}
        onInputChange={(_, v) => setInput(v)}
        className="bg-transparent shadow-none"
        slotProps={{
          root: {
            className:
              "!rounded-none !border-b-[1px] lg:!border-b-[3px] !ps-[10px] !pe-[10px]",
            sx: {
              backgroundColor: "transparent",
              border: "none",
              borderBottom: "solid black",
              boxShadow: "none",
              "&.Mui-focused": {
                "--Input-focusedHighlight": "none",
              },
            },
          },
          input: {
            className: "text-center text-black placeholder:!text-[#AAA]",
            name: "search",
          },
          wrapper: { className: "text-[30px] lg:!text-[100px]" },
          listbox: {
            className:
              "!text-[1rem] !rounded-none !shadow-none !border-none popisky-13",
          },
        }}
        placeholder="Svatý Jan pod Skalou"
        clearOnBlur={false}
        startDecorator={undefined}
        popupIcon={null}
      />
      <button
        className="button button-green mt-8 lg:mt-16 uppercase mx-auto"
        onClick={() => {
          if (!input) return;

          const filtered = filterOptions(obecList, {
            inputValue: input,
            getOptionLabel: (o) => o.metadata.name,
          });
          const o = filtered[0];
          if (o) router.push(`/obec/${o.id}/${o.slug}`);
        }}
      >
        {loading ? (
          <div className="rounded-full border-t-2 border-l-2 animate-spin h-6 w-6" />
        ) : (
          "Vyhledat obec"
        )}
      </button>
      <div className="text-center">
        <p className="my-5">nebo</p>
        <Link
          href="/mapa"
          className="button uppercase mx-auto inline-flex whitespace-nowrap flex-nowrap gap-1 items-center"
        >
          <span>HLEDAT NA MAPĚ</span>
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src="/static/cz.svg" />
        </Link>
      </div>
    </div>
  );
};
