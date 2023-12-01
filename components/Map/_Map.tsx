"use client";

import { ObecMetadata } from "@/lib/db";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useImperativeHandle,
  useState,
} from "react";
import { ObecSearch } from "../Autocomplete/ObecSearch";
import { useLeaflet } from "./leaflet";
import "./mapa.css";
import { CategoryBar } from "../CategoryBar";
import { ProtectionBar } from "../ProtectionBar";

export interface MapProps {
  defaultCenter?: [number, number];
  defaultZoom?: number;
  obecHidden?: boolean;

  mapRef: MutableRefObject<MapController>;
}

export type MapController = {
  queue: (() => unknown)[];
  ready: boolean;
  leaflet: L.Map;
  setCategory: Dispatch<SetStateAction<ObecMetadata["category"] | undefined>>;
  setProtectionZone: Dispatch<
    SetStateAction<ObecMetadata["protectionZone"] | undefined>
  >;
  execute: (cb: () => unknown) => unknown;
};

export const _Map = (props: MapProps) => {
  const { mapRef, containerRef } = useLeaflet(props);

  const [category, setCategory] = useState<ObecMetadata["category"]>();
  const [protectionZone, setProtectionZone] =
    useState<ObecMetadata["protectionZone"]>();
  props.mapRef.current.setCategory = setCategory;
  props.mapRef.current.setProtectionZone = setProtectionZone;

  return (
    <div ref={containerRef} className="h-full relative">
      <div ref={mapRef} className="h-full" />

      <div className="absolute top-0 left-0 w-[320px] ml-10 mt-6 z-[410]">
        <ObecSearch
          options={[]}
          searchDecorator
          inner={{
            input: { className: "map-search", placeholder: "VYHLEDAT OBEC" },
          }}
        />
        <div className="map-search-decorator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <circle
              cx="5"
              cy="5"
              r="4.25"
              stroke="black"
              strokeOpacity="0.5"
              strokeWidth="1.5"
            />
            <line
              x1="8.53033"
              y1="8.46967"
              x2="12.7656"
              y2="12.705"
              stroke="black"
              strokeOpacity="0.5"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
      <div className="absolute top-0 right-0 mr-10 mt-6 z-[410]">
        <Link href="/" className="button px-10 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M23.8333 11.5863L12.4086 0.169459C12.1824 -0.0564862 11.8143 -0.0564862 11.5914 0.169459L0.166683 11.5863C-0.191288 11.9452 0.0653694 12.5466 0.57531 12.5466H3.04396V23.4318C3.04396 23.7442 3.30062 23.9967 3.61807 23.9967H9.0079V17.1253C9.0079 16.813 9.26456 16.5604 9.582 16.5604H14.4214C14.7388 16.5604 14.9955 16.813 14.9955 17.1253V24H20.3819C20.6994 24 20.956 23.7475 20.956 23.4351V12.5499H23.4247C23.9346 12.5499 24.1913 11.9452 23.8333 11.5863Z"
              fill="black"
            />
          </svg>
        </Link>
      </div>

      <div
        className={`
          absolute left-0 ${
            props.obecHidden ? "bottom-0" : "bottom-[85px] lg:bottom-[150px]"
          }
          z-[410] ml-10 mb-6 space-y-6 map-zones
        `}
      >
        <div className="cursor-pointer popisky-13">
          <div className="uppercase mb-2">Kategorie sídla</div>
          <CategoryBar category={category} />
        </div>

        <div className="cursor-pointer popisky-13">
          <div className="uppercase mb-2">Pásmo ochrany</div>
          <ProtectionBar protectionZone={protectionZone} />
        </div>
      </div>
    </div>
  );
};
