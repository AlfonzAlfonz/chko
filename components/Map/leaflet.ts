import * as L from "leaflet/dist/leaflet-src.esm";
import { useRouter } from "next/navigation";
import {
  SetStateAction,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChkoListContext, ObecListContext } from "../contexts";
import { MapProps } from "./_Map";
import { ensureSimplifiedChkoGeo } from "./data";

export const useLeaflet = (props: MapProps) => {
  const router = useRouter();
  const once = useRef<boolean>(false);

  const obecList = useContext(ObecListContext);
  const chkoList = useContext(ChkoListContext);

  const chkoKodDic = useMemo(
    () => Object.fromEntries(chkoList.map((ch) => [ch.data.kod, ch])),
    [chkoList]
  );

  const wrapperRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);

  const leaflet = {
    scrollWheelZoom: !props.activeObec ?? true,
    defaultCenter: props.defaultCenter ?? [49.74375, 15.338639],
    defaultZoom: props.defaultZoom ?? 8,
  };

  const [tileLayer, setTileLayer] = useTileLayerUrl((v) => {
    setTileLayerUrl(props.mapRef.current.leaflet, v);
  });

  useLayoutEffect(() => {
    if (!once.current) {
      const mapRef = props.mapRef!;
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
        mapRef.current.leaflet = map;

        setTileLayerUrl(map, tileLayer);

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
          const zoom = mapRef.current!.leaflet.getZoom();

          zoomHandler(zoom);
        });
        zoomHandler(leaflet.defaultZoom);

        L.control
          .scale({
            metric: true,
            imperial: false,
            position: "bottomright",
            maxWidth: 200,
          })
          .addTo(map);

        props.mapRef.current.ready = true;
        props.mapRef.current.queue.forEach((cb) => cb());
        props.mapRef.current.queue = [];

        const geoData = await ensureSimplifiedChkoGeo();

        const geojson = L.geoJSON(geoData, {
          style: (f) => ({
            fillOpacity: 1,
            className: `map-geojson ${
              f?.properties.KOD && !(f?.properties.KOD in chkoKodDic)
                ? "chko-inactive"
                : ""
            }`,
          }),
        });
        geojson.addEventListener("click", (e) => {
          const data = e.propagatedFrom.feature?.properties;
          if (data && data.KOD && chkoKodDic[data.KOD]) {
            map.flyTo(chkoKodDic[data.KOD]!.data.position, 11);
          }
        });
        map.addLayer(geojson);

        for (const obec of obecList) {
          const m = L.marker(obec.metadata.position, {
            icon: L.divIcon({
              className: `map-marker map-obec-marker map-marker-${obec.metadata.category}`,
              html: obec.metadata.name,
            }),
          }).addTo(mapRef.current.leaflet);
          m.addEventListener("click", () => {
            router.push(`/obec/${obec.id}/${obec.slug}`);
          });
        }

        for (const chko of chkoList) {
          const m = L.marker(chko.data.position, {
            icon: L.divIcon({
              className: `map-marker map-chko-marker`,
              html: chko.name,
            }),
          }).addTo(mapRef.current.leaflet);
          m.addEventListener("click", () => {
            map.flyTo(chko.data.position, 11);
          });
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const mapRef = props.mapRef!;
    if (
      !!leaflet.scrollWheelZoom !==
      !!mapRef.current?.leaflet.scrollWheelZoom.enabled()
    ) {
      !!leaflet.scrollWheelZoom
        ? mapRef.current?.leaflet.scrollWheelZoom.enable()
        : mapRef.current?.leaflet.scrollWheelZoom.disable();
    }
  }, [leaflet.scrollWheelZoom, props.mapRef]);

  return {
    mapRef: containerRef,
    containerRef: wrapperRef,
    tileLayer,
    setTileLayer,
  };
};

const topoUrl =
  "https://api.mapbox.com/styles/v1/alfonz/clf6vgysg00cq01mlod7t0zro/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxmb256IiwiYSI6ImNsZjZ2MDRoNTFxbTkzeW56a2sxYnk2MHQifQ.bp9byZzeMm71V2pGiLqfNA";

const photoUrl =
  "https://api.mapbox.com/styles/v1/alfonz/clf6ywx3p000z01l9lruz0y7r/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxmb256IiwiYSI6ImNsZjZ2MDRoNTFxbTkzeW56a2sxYnk2MHQifQ.bp9byZzeMm71V2pGiLqfNA";

const isTileLayer = (layer: L.Layer): layer is L.TileLayer => {
  return "getTileUrl" in layer;
};

const localStorageKey = "chko.map.tileLayer";

const useTileLayerUrl = (onChange?: (v: "photo" | "topo") => unknown) => {
  const [state, setState] = useState(
    (localStorage.getItem(localStorageKey) as "photo" | "topo") ?? "topo"
  );

  return [
    state,
    (v: SetStateAction<"photo" | "topo">) => {
      setState((s) => {
        let value = typeof v === "function" ? v(s) : v;

        onChange?.(value);
        localStorage.setItem(localStorageKey, value);

        return value;
      });
    },
  ] as const;
};

const setTileLayerUrl = (map: L.Map, value: "photo" | "topo") => {
  const url = value === "photo" ? photoUrl : topoUrl;

  map.getContainer().setAttribute("data-tileLayer", value);

  map.eachLayer((l) => {
    if (isTileLayer(l)) {
      map.removeLayer(l);
    }
  });

  const tiles = L.tileLayer(url, {
    attribution:
      '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 8,
    maxZoom: 20,
  });
  map.addLayer(tiles);
};
