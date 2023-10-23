"use client";

import { ObecMetadata } from "@/lib/db";
import { ReactNode, createContext } from "react";

type ConciseObec = {
  metadata: ObecMetadata;
  id: number;
  slug: string;
};

export const ObecListContext = createContext<ConciseObec[]>([]);

export const ObecListProvider = ({
  value,
  children,
}: {
  value: ConciseObec[];
  children: ReactNode;
}) => (
  <ObecListContext.Provider value={value}>{children}</ObecListContext.Provider>
);
