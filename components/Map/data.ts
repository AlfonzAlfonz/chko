let simplifiedChkoGeo: any | undefined;
export const ensureSimplifiedChkoGeo = async () => {
  if (!simplifiedChkoGeo) {
    const geo = await fetch("/data/simplified.geojson").then((r) => r.json());
    simplifiedChkoGeo = geo;
  }
  return simplifiedChkoGeo!;
};

let fullChkoGeo: any | undefined;
export const ensurefullChkoGeo = async () => {
  if (!fullChkoGeo) {
    const geo = await fetch("/data/full.geojson").then((r) => r.json());
    fullChkoGeo = geo;
  }
  return fullChkoGeo!;
};
