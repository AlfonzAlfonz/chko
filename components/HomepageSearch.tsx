"use client";

import { useContext, useState } from "react";
import { ObecSearch } from "./Autocomplete/ObecSearch";
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
        inner={{ input: { className: "search bg-chkobg" } }}
        onChange={() => setLoading(true)}
        onInputChange={setInput}
      />
      <button
        className="button mt-16"
        onClick={() => {
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
          "Vyhledat"
        )}
      </button>
    </>
  );
};
