"use client";

import dynamic from "next/dynamic";
import { RefObject, createContext, useContext, useEffect } from "react";
import { MapController } from "./_Map";
import { ObecMetadata } from "@/lib/db";

export const Map = dynamic(() => import("./_Map").then((mod) => mod._Map), {
  ssr: false,
});

export const MapContext = createContext<RefObject<MapController>>(null!);

export const MapControllerComponent = ({
  category,
  protectionZone,
  position,
}: ObecMetadata) => {
  const controller = useContext(MapContext);

  useEffect(() => {
    const control = controller.current;
    control?.execute(() => {
      control?.leaflet.setView(position, 16, { animate: true });
      control?.setCategory(category);
      control?.setProtectionZone(protectionZone);
    });

    return () => {
      control?.execute(() => {
        control?.setCategory(undefined);
        control?.setProtectionZone(undefined);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};
