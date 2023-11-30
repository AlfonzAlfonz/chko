import { useState } from "react";
import { DeepPartial, useForm } from "./useForm";
import { obecScheme } from "@/lib/schemas";
import { FigureData, ObecTable } from "@/lib/db";
import { FigureControlValue } from "./FigureControl/FigureControl";
import { put } from "@vercel/blob";
import { mapValibotResult } from "./useForm";
import * as v from "valibot";
import getSlug from "speakingurl";
import { useRouter } from "next/navigation";

export const useObecForm = ({
  initialValue,
  onSubmit: save,
}: {
  initialValue?: ObecTable;
  onSubmit?: (obec: ObecTable) => Promise<number | undefined>;
}) => {
  const router = useRouter();
  const [state, setState] = useState<"posting" | "ready">("ready");
  const form = useForm<typeof obecScheme, DeepPartial<ObecTable>>({
    defaultValue: initialValue ?? emptyObec,
    validate: (val) => mapValibotResult(v.safeParse(obecScheme, val)),
    onSubmit: async (v) => {
      setState("posting");
      const {
        data: { cover, characteristics, buildings, ...data },
        ...value
      } = v;

      if (!save) return;

      const prefix = "obec/" + initialValue?.id;

      const [coverImg, cImages, bImages] = await Promise.all([
        cover?.blob && upload(prefix + "/cover", cover),
        Promise.all(
          characteristics.map(
            (c, i) => c?.blob && upload(`${prefix}/char/${i}`, c)
          ) ?? []
        ),
        Promise.all(
          buildings.map(
            (b, i) => b?.blob && upload(`${prefix}/buildings/${i}`, b)
          ) ?? []
        ),
      ]);

      const insertedId = await save({
        ...value,
        id: value.id!,
        slug: getSlug(value.metadata.name),
        published: false,
        data: {
          ...data,
          cover: {
            ...cover,
            ...(coverImg as any),
          },
          characteristics: characteristics.map((c, i) =>
            !c
              ? undefined
              : {
                  url: cImages[i]?.url ?? c?.url,
                  width: cImages[i]?.width ?? c?.width,
                  height: cImages[i]?.height ?? c?.height,
                  caption: c?.caption,
                }
          ) as any satisfies (FigureData | undefined)[] as any,
          buildings: buildings.map((b, i) =>
            !b
              ? undefined
              : {
                  url: bImages[i]?.url ?? b?.url,
                  width: bImages[i]?.width ?? b?.width,
                  height: bImages[i]?.height ?? b?.height,
                  caption: b?.caption,
                }
          ) as any satisfies (FigureData | undefined)[] as any,
        } as any,
      });

      setState("ready");
      alert("Uloženo");

      if (insertedId) {
        router.push(`/admin/obec/${insertedId}`);
      }
    },
  });

  return { ...form, state };
};

const emptyObec: DeepPartial<ObecTable> = {
  published: true,
  metadata: {
    position: [],
  },
  data: {
    censuses: [
      [1869, undefined, undefined],
      [2011, undefined, undefined],
    ],
    characteristics: [],
    buildings: [],
    terms: [],
    links: [],
  },
};

const upload = async (path: string, { blob, url }: FigureControlValue) => {
  if (!blob) return;

  url && URL.revokeObjectURL(url);

  const size = await getImageSize(blob);

  if (!size) throw new Error("Invalid file");

  const result = await put(path + blob.name, blob, {
    access: "public",
    token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
  });
  return {
    url: result.url,
    width: size[0],
    height: size[1],
  };
};

const getImageSize = (blob: Blob) =>
  new Promise<[number, number] | null>((resolve) => {
    const img = document.createElement("img");

    img.onload = () => {
      resolve([img.naturalWidth, img.naturalHeight]);
      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
      resolve(null);
      URL.revokeObjectURL(img.src);
    };

    img.src = URL.createObjectURL(blob);
  });

const getPdfUrl = async () => {};
