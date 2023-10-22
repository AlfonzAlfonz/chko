"use client";

import { useRouter } from "next/navigation";
import { Autocomplete } from "./Autocomplete";

export const ObecSearch = ({
  options,
}: {
  options: { value: number; label: string; slug: string }[];
}) => {
  const router = useRouter();

  return (
    <Autocomplete
      options={options}
      onChange={(_, val) => {
        if (!val) return;

        router.push(`/obec/${val.value}/${val.slug}`);
      }}
    />
  );
};
