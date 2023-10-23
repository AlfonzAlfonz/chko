"use client";

import * as L from "leaflet/dist/leaflet-src.esm";
import "leaflet/dist/leaflet.css";
import { useContext, useLayoutEffect, useRef } from "react";
import { ensureSimplifiedChkoGeo } from "./data";
import "./mapa.css";
import { ObecMetadata } from "@/lib/db";
import { ObecSearch } from "../Autocomplete/ObecSearch";
import Link from "next/link";
import { ObecListContext } from "../contexts";

export const _Map = ({
  defaultView,
  defaultZoom,
  options,
  category,
  protectionZone,
}: {
  defaultView?: [number, number];
  defaultZoom?: number;

  options?: L.MapOptions;

  category?: ObecMetadata["category"];
  protectionZone?: ObecMetadata["protectionZone"];
}) => {
  const obecList = useContext(ObecListContext);

  const once = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null!);
  const mapRef = useRef<HTMLDivElement>(null!);
  const map = useRef<L.Map>();

  useLayoutEffect(() => {
    if (!once.current) {
      once.current = true;
      (async () => {
        map.current = L.map(mapRef.current, {
          zoomControl: false,
          maxBounds: [
            [48.2, 11.8],
            [51.2, 19],
          ],
          ...options,
        }).setView(defaultView ?? [49.9695, 14.1306], defaultZoom ?? 10);

        const tiles = L.tileLayer(url, {
          attribution:
            '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          tileSize: 512,
          zoomOffset: -1,
          minZoom: 8,
          maxZoom: 20,
        });
        map.current.addLayer(tiles);

        const geoData = await ensureSimplifiedChkoGeo();

        const geojson = L.geoJSON(geoData, {
          style: {
            fillOpacity: 1,
            className: "map-geojson",
          },
        });
        map.current.addLayer(geojson);

        const zoomHandler = (zoom: number) => {
          if (zoom > 10) {
            containerRef.current.classList.add("map-detail10");
          } else {
            containerRef.current.classList.remove("map-detail10");
          }

          if (zoom > 13) {
            containerRef.current.classList.add("map-detail13");
          } else {
            containerRef.current.classList.remove("map-detail13");
          }
        };
        map.current.addEventListener("zoomend", () => {
          const zoom = map.current!.getZoom();

          zoomHandler(zoom);
        });
        zoomHandler(defaultZoom ?? 10);

        for (const obec of obecList) {
          L.marker(obec.metadata.position, {
            icon: L.divIcon({
              className: `map-marker map-marker-${obec.metadata.category}`,
              html: obec.metadata.name,
            }),
          }).addTo(map.current);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              stroke-opacity="0.5"
              stroke-width="1.5"
            />
            <line
              x1="8.53033"
              y1="8.46967"
              x2="12.7656"
              y2="12.705"
              stroke="black"
              stroke-opacity="0.5"
              stroke-width="1.5"
            />
          </svg>
        </div>
      </div>
      <div className="absolute top-0 right-0 mr-10 mt-6 z-[410]">
        <Link href="/mapa" className="button px-10">
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

      <div className="absolute bottom-0 left-0 z-[410] ml-10 mb-6 space-y-6 map-zones">
        <div className="cursor-pointer popisky-13">
          <div className="uppercase mb-2">Kategorie sídla</div>
          <div className="flex select-none">
            {Object.entries(categories).map(([v, c]) => (
              <div
                key={v}
                className={`w-[42px] h-[24px] flex items-center justify-center ${c} ${
                  v === category
                    ? "outline-black outline-2 outline z-10"
                    : "opacity-50"
                }`}
              >
                {v}
              </div>
            ))}
          </div>
        </div>

        <div className="cursor-pointer popisky-13">
          <div className="uppercase mb-2">Pásmo ochrany</div>
          <div className="flex select-none">
            {Object.entries(protectionZones).map(([v, c], i) => (
              <div
                key={v}
                className={`w-[42px] h-[24px] flex items-center justify-center ${c} ${
                  i < 2
                    ? "outline-white text-white"
                    : "outline-black text-black"
                } ${
                  v === protectionZone ? "outline-2 outline z-10" : "opacity-50"
                }`}
              >
                {v}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const url =
  "https://api.mapbox.com/styles/v1/alfonz/clf6vgysg00cq01mlod7t0zro/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxmb256IiwiYSI6ImNsZjZ2MDRoNTFxbTkzeW56a2sxYnk2MHQifQ.bp9byZzeMm71V2pGiLqfNA";

const ACCESS_TOKEN =
  "pk.eyJ1IjoiYWxmb256IiwiYSI6ImNsZjZ2MDRoNTFxbTkzeW56a2sxYnk2MHQifQ.bp9byZzeMm71V2pGiLqfNA";

// https://api.mapbox.com/styles/v1/alfonz/clf6vgysg00cq01mlod7t0zro/wmts?access_token=pk.eyJ1IjoiYWxmb256IiwiYSI6ImNsZjZ2MDRoNTFxbTkzeW56a2sxYnk2MHQifQ.bp9byZzeMm71V2pGiLqfNA

const categories: Record<ObecMetadata["category"], string> = {
  I: "bg-chkored",
  II: "bg-chkoorange",
  III: "bg-chkoyellow",
  IV: "bg-chkogreen",
};

const protectionZones: Record<ObecMetadata["protectionZone"], string> = {
  A: "bg-black",
  B: "bg-[#1A1A1A]",
  C: "bg-white",
};
