"use client";

import { Map, MapContext } from "@/components/Map/Map";
import type { MapController } from "@/components/Map/_Map";
import { usePathname } from "next/navigation";
import { ReactNode, useRef } from "react";

const Template = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const mapRef = useRef<MapController>(null!);

  const map = pathname === "/mapa";

  return (
    <div className="h-screen">
      <div className={map ? "h-full" : "h-[calc(100%-150px)]"}>
        <Map scrollWheelZoom={map} mapRef={mapRef} />
      </div>
      <MapContext.Provider value={mapRef}>{children}</MapContext.Provider>
    </div>
  );
};

export default Template;
