"use client";

import { Minus } from "@/components/icons/Minus";
import { Plus } from "@/components/icons/Plus";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";
import { CategoryBar } from "../CategoryBar";
import { ObecSearch } from "../ObecSearch";
import { ProtectionBar } from "../ProtectionBar";
import { useLeaflet } from "./leaflet";
import "./mapa.css";
import { ObecMetadata } from "@/lib/obec";
import { Layers } from "@/components/icons/Layers";
import { Close } from "@/components/icons/Close";
import { Chevron } from "@/components/icons/Chevron";

export interface MapProps {
  defaultCenter?: [number, number];
  defaultZoom?: number;
  activeObec?: number;

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
  const { mapRef, containerRef, tileLayer, setTileLayer } = useLeaflet(props);

  const [category, setCategory] = useState<ObecMetadata["category"]>();
  const [protectionZone, setProtectionZone] =
    useState<ObecMetadata["protectionZone"]>();
  const [showInfoMobile, setShowInfoMobile] = useState(false);
  props.mapRef.current.setCategory = setCategory;
  props.mapRef.current.setProtectionZone = setProtectionZone;

  return (
    <div
      ref={containerRef}
      className={`h-full relative min-h-[300px] ${
        tileLayer === "photo" ? "bg-[#1A331A]" : "bg-[#C4DEAB]"
      } ${props.activeObec ? "active-obec" : ""}`}
    >
      <div ref={mapRef} className={`h-full`} />

      <div className="absolute top-0 left-0 w-full flex items-center justify-between gap-1 px-4 py-4 md:px-8 z-[410]">
        <div className="w-[calc(100%-64px)] md:w-[320px]">
          <ObecSearch className="!popisky-13" defaultId={props.activeObec} />
        </div>
        <div>
          <Link href="/" className="button md:px-10 py-[7px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
            >
              <path
                d="M23.8333 11.5863L12.4086 0.169459C12.1824 -0.0564862 11.8143 -0.0564862 11.5914 0.169459L0.166683 11.5863C-0.191288 11.9452 0.0653694 12.5466 0.57531 12.5466H3.04396V23.4318C3.04396 23.7442 3.30062 23.9967 3.61807 23.9967H9.0079V17.1253C9.0079 16.813 9.26456 16.5604 9.582 16.5604H14.4214C14.7388 16.5604 14.9955 16.813 14.9955 17.1253V24H20.3819C20.6994 24 20.956 23.7475 20.956 23.4351V12.5499H23.4247C23.9346 12.5499 24.1913 11.9452 23.8333 11.5863Z"
                fill="black"
              />
            </svg>
          </Link>
        </div>
      </div>

      <div
        className={`absolute left-0 md:hidden z-[410] m-4 ${
          props.activeObec ? "bottom-[85px] lg:bottom-[150px]" : "bottom-0"
        }`}
      >
        <button
          className="button w-12 h-12 pointer-events-auto p-0 flex items-center justify-center shadow-md"
          onClick={() => setShowInfoMobile(true)}
        >
          <Layers />
        </button>
      </div>
      {props.activeObec && (
        <div className="absolute bottom-[85px] md:hidden z-[910] lg:bottom-[150px] my-4 left-[50%] translate-x-[-50%]">
          <a
            href="#obec"
            className="button w-12 h-12 pointer-events-auto p-0 flex items-center justify-center shadow-md rotate-180"
          >
            <Chevron color="black" />
          </a>
        </div>
      )}
      {showInfoMobile && (
        <div
          className={`md:hidden absolute left-0 right-0 bottom-0 flex gap-2 bg-chkobg z-[1001] justify-between flex-col p-8`}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 pointer-events-auto p-0 flex items-center justify-center"
            onClick={() => setShowInfoMobile(false)}
          >
            <Close />
          </button>
          <div className="flex gap-4">
            <div
              className="cursor-pointer w-12 h-12 bg-black border-[3px] border-white border-solid rounded-sm shadow-lg pointer-events-auto"
              onClick={() => (setTileLayer("photo"), setShowInfoMobile(false))}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/static/map/photo.jpeg" alt="podklad" />
            </div>
            <div
              className="cursor-pointer w-12 h-12 bg-black border-[3px] border-white border-solid rounded-sm shadow-lg pointer-events-auto"
              onClick={() => (setTileLayer("topo"), setShowInfoMobile(false))}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/static/map/topo.png" alt="podklad" />
            </div>
          </div>

          <div className="pointer-events-auto mt-2">
            <div className="uppercase mb-2 popisky-13">Kategorie sídla</div>
            <CategoryBar category={category} />
            {/* <div className="mt-4">TODO: tu by mal byt popisok</div> */}
          </div>

          <div className="pointer-events-auto mt-2">
            <div className="uppercase mb-2 popisky-13">Pásmo ochrany</div>
            <ProtectionBar protectionZone={protectionZone} />
            {/* <div className="mt-4">TODO: tu by mal byt popisok</div> */}
          </div>
        </div>
      )}
      <div
        className={`absolute left-0 right-0 hidden md:flex ${
          props.activeObec ? "bottom-[85px] lg:bottom-[150px]" : "bottom-0"
        } z-[410] items-end justify-between mx-10 mb-6 pointer-events-none`}
      >
        <div className="space-y-6 w-[200px]">
          <div className="cursor-pointer popisky-13 map-zones pointer-events-auto w-[168px]">
            <div
              className={`uppercase mb-2 ${
                tileLayer === "photo" ? "text-white" : ""
              }`}
            >
              Kategorie sídla
            </div>
            <CategoryBar category={category} />
          </div>

          <div className="cursor-pointer popisky-13 map-zones pointer-events-auto w-[168px]">
            <div
              className={`uppercase mb-2 ${
                tileLayer === "photo" ? "text-white" : ""
              }`}
            >
              Pásmo ochrany
            </div>
            <ProtectionBar protectionZone={protectionZone} />
          </div>

          <div
            className="w-12 h-12 bg-black border-[3px] border-white border-solid rounded-sm shadow-lg pointer-events-auto"
            onClick={() =>
              setTileLayer((v) => (v === "photo" ? "topo" : "photo"))
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                tileLayer === "topo"
                  ? "/static/map/photo.jpeg"
                  : "/static/map/topo.png"
              }
              alt="podklad"
            />
          </div>
        </div>
        {props.activeObec && (
          <div>
            <a
              href="#obec"
              className="button w-12 h-12 pointer-events-auto p-0 flex items-center justify-center shadow-md rotate-180"
            >
              <Chevron color="black" />
            </a>
          </div>
        )}
        <div className="space-y-3 mb-12  w-[200px] flex flex-col items-end">
          <button
            className="button w-12 h-12 pointer-events-auto p-0 flex items-center justify-center shadow-md"
            onClick={() => props.mapRef.current.leaflet.zoomIn()}
          >
            <Plus />
          </button>
          <button
            className="button w-12 h-12 pointer-events-auto p-0 flex items-center justify-center shadow-md"
            onClick={() => props.mapRef.current.leaflet.zoomOut()}
          >
            <Minus />
          </button>
        </div>
      </div>
    </div>
  );
};
