"use client";

import { useContext, useState } from "react";
import { ObecSearch } from "./ObecSearch";
import { ObecListContext } from "./contexts";
import { useRouter } from "next/navigation";

export const HomepageSearch = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const obecList = useContext(ObecListContext);

  return (
    <>
      <ObecSearch
        onChange={() => setLoading(true)}
        onInputChange={(_, v) => setInput(v)}
        className="bg-transparent shadow-none border-none"
        slotProps={{
          root: { className: "!rounded-none" },
          input: { className: "text-[100px] text-[#AAA] text-center" },
          listbox: { className: "!text-[1rem]" },
        }}
        placeholder="Svatý Jan pod Skalou"
        startDecorator={undefined}
        popupIcon={null}
      />
      <button
        className="button mt-16 uppercase bg-chkogreen text-white"
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
    </>
  );
};
