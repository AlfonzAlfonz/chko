"use client";

import dynamic from "next/dynamic";

export const Map = dynamic(() => import("./_Map").then((mod) => mod._Map), {
  ssr: false,
});
