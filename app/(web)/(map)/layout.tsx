"use client";

import { Map, MapContext } from "@/components/Map/Map";
import type { MapController } from "@/components/Map/_Map";
import { usePathname } from "next/navigation";
import { ReactNode, useRef } from "react";

const Template = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const mapRef = useRef<MapController>(createController());

  const map = pathname === "/mapa";

  return (
    <div className="h-screen">
      <div className={"h-full"}>
        <Map obecHidden={map} mapRef={mapRef} />
      </div>
      <MapContext.Provider value={mapRef}>{children}</MapContext.Provider>
    </div>
  );
};

export default Template;

const createController = (): MapController => {
  return {
    queue: [],
    ready: false,
    leaflet: null!,
    setCategory: null!,
    setProtectionZone: null!,
    execute: function (cb) {
      if (this.ready) {
        cb();
      } else {
        this.queue.push(cb);
      }
    },
  };
};