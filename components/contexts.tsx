"use client";

import { ChkoTable } from "@/lib/chko";
import { ObecMetadata } from "@/lib/obec";
import { ComponentProps, createContext } from "react";

export type ConciseObec = {
  metadata: ObecMetadata;
  id: number;
  slug: string;
};

export const ObecListContext = createContext<ConciseObec[]>([]);
export const ChkoListContext = createContext<ChkoTable[]>([]);

export const ObecListProvider = (
  props: ComponentProps<typeof ObecListContext.Provider>
) => <ObecListContext.Provider {...props} />;

export const ChkoListProvider = (
  props: ComponentProps<typeof ChkoListContext.Provider>
) => <ChkoListContext.Provider {...props} />;
