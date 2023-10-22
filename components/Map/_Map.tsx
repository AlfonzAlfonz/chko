"use client";
import * as L from "leaflet/dist/leaflet-src.esm";
import "leaflet/dist/leaflet.css";
import { useLayoutEffect, useRef } from "react";
import { ensureSimplifiedChkoGeo } from "./data";
import "./mapa.css";

export const _Map = ({
  defaultView,
  defaultZoom,
  options,
}: {
  defaultView?: [number, number];
  defaultZoom?: number;

  options?: L.MapOptions;
}) => {
  const once = useRef<boolean>(false);
  const ref = useRef<HTMLDivElement>(null!);
  const map = useRef<L.Map>();

  useLayoutEffect(() => {
    if (!once.current) {
      once.current = true;
      (async () => {
        map.current = L.map(ref.current, {
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
            ref.current.classList.add("map-detail");
          } else {
            ref.current.classList.remove("map-detail");
          }
        };
        map.current.addEventListener("zoomend", () => {
          const zoom = map.current!.getZoom();

          zoomHandler(zoom);
        });
        zoomHandler(defaultZoom ?? 10);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref} className="h-full" />;
};

const url =
  "https://api.mapbox.com/styles/v1/alfonz/clf6vgysg00cq01mlod7t0zro/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxmb256IiwiYSI6ImNsZjZ2MDRoNTFxbTkzeW56a2sxYnk2MHQifQ.bp9byZzeMm71V2pGiLqfNA";

const ACCESS_TOKEN =
  "pk.eyJ1IjoiYWxmb256IiwiYSI6ImNsZjZ2MDRoNTFxbTkzeW56a2sxYnk2MHQifQ.bp9byZzeMm71V2pGiLqfNA";

// https://api.mapbox.com/styles/v1/alfonz/clf6vgysg00cq01mlod7t0zro/wmts?access_token=pk.eyJ1IjoiYWxmb256IiwiYSI6ImNsZjZ2MDRoNTFxbTkzeW56a2sxYnk2MHQifQ.bp9byZzeMm71V2pGiLqfNA
