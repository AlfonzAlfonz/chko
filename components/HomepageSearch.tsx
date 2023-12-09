"use client";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { ObecSearch } from "./ObecSearch";
import { ObecListContext } from "./contexts";

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
          },
          wrapper: { className: "text-[30px] lg:!text-[100px]" },
          listbox: {
            className:
              "!text-[1rem] !rounded-none !shadow-none !border-none popisky-13",
          },
          option: {
            className:
              "!uppercase hover:!bg-transparent hover:text-black hover:underline",
          },
          noOptions: {
            className:
              "!uppercase hover:!bg-transparent hover:text-black hover:underline",
          },
        }}
        placeholder="Svatý Jan pod Skalou"
        startDecorator={undefined}
        popupIcon={null}
      />
      <button
        className="button mt-8 lg:mt-16 uppercase bg-chkogreen text-white mx-auto"
        onClick={() => {
          if (!input) return;

          const o = obecList.find((x) => x.metadata.name.includes(input));
          if (o) {
            router.push(`/obec/${o.id}/${o.slug}`);
            setLoading(true);
          }
        }}
      >
        {loading ? (
          <div className="rounded-full border-t-2 border-l-2 animate-spin h-6 w-6" />
        ) : (
          "Vyhledat obec"
        )}
      </button>
    </div>
  );
};
