import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import * as L from "leaflet/dist/leaflet-src.esm";
import { ensureSimplifiedChkoGeo } from "./data";
import { MapProps } from "./_Map";
import { ObecListContext } from "../contexts";
import { useRouter } from "next/navigation";

export const useLeaflet = (props: MapProps) => {
  const router = useRouter();
  const once = useRef<boolean>(false);
  const mapRef = useRef<L.Map>();

  const obecList = useContext(ObecListContext);

  const wrapperRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);

  const leaflet = {
    scrollWheelZoom: props.scrollWheelZoom ?? true,
    defaultCenter: props.defaultCenter ?? [49.9695, 14.1306],
    defaultZoom: props.defaultZoom ?? 10,
  };

  useLayoutEffect(() => {
    if (!once.current) {
      once.current = true;
      (async () => {
        const map = L.map(containerRef.current, {
          zoomControl: false,
          maxBounds: [
            [48.2, 11.8],
            [51.2, 19],
          ],
          scrollWheelZoom: leaflet.scrollWheelZoom,
          center: leaflet.defaultCenter,
          zoom: leaflet.defaultZoom,
        });
        mapRef.current = map;

        const tiles = L.tileLayer(url, {
          attribution:
            '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          tileSize: 512,
          zoomOffset: -1,
          minZoom: 8,
          maxZoom: 20,
        });
        map.addLayer(tiles);

        const zoomHandler = (zoom: number) => {
          if (zoom > 10) {
            wrapperRef.current.classList.add("show-details");
          } else {
            wrapperRef.current.classList.remove("show-details");
          }

          if (zoom < 13) {
            // router.push("/mapa");
          }
        };
        map.addEventListener("zoom", () => {
          const zoom = mapRef.current!.getZoom();

          zoomHandler(zoom);
        });
        zoomHandler(leaflet.defaultZoom);

        const geoData = await ensureSimplifiedChkoGeo();

        const geojson = L.geoJSON(geoData, {
          style: {
            fillOpacity: 1,
            className: "map-geojson",
          },
        });
        map.addLayer(geojson);

        for (const obec of obecList) {
          const m = L.marker(obec.metadata.position, {
            icon: L.divIcon({
              className: `map-marker map-marker-${obec.metadata.category}`,
              html: obec.metadata.name,
            }),
          }).addTo(mapRef.current);
          m.addEventListener("click", () => {
            router.push(`/obec/${obec.id}/${obec.slug}`);
          });
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      !!leaflet.scrollWheelZoom !== !!mapRef.current?.scrollWheelZoom.enabled()
    ) {
      !!leaflet.scrollWheelZoom
        ? mapRef.current?.scrollWheelZoom.enable()
        : mapRef.current?.scrollWheelZoom.disable();
    }
  }, [leaflet.scrollWheelZoom]);

  return {
    map: mapRef,
    mapRef: containerRef,
    containerRef: wrapperRef,
  };
};

const url =
  "https://api.mapbox.com/styles/v1/alfonz/clf6vgysg00cq01mlod7t0zro/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxmb256IiwiYSI6ImNsZjZ2MDRoNTFxbTkzeW56a2sxYnk2MHQifQ.bp9byZzeMm71V2pGiLqfNA";

const ACCESS_TOKEN =
  "pk.eyJ1IjoiYWxmb256IiwiYSI6ImNsZjZ2MDRoNTFxbTkzeW56a2sxYnk2MHQifQ.bp9byZzeMm71V2pGiLqfNA";
