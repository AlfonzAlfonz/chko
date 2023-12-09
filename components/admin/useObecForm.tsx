import { FigureData, ObecTable } from "@/lib/db";
import { figureSchema, obecScheme } from "@/lib/schemas";
import { put } from "@vercel/blob";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import getSlug from "speakingurl";
import * as v from "valibot";
import { Output } from "valibot";
import { DeepPartial, mapValibotResult, useForm } from "./useForm";

export const useObecForm = ({
  initialValue,
  onSubmit: save,
}: {
  initialValue?: ObecTable;
  onSubmit?: (obec: ObecTable) => Promise<ObecTable>;
}) => {
  const { id } = useParams() ?? {};
  const router = useRouter();
  const [state, setState] = useState<"posting" | "ready">("ready");
  const form = useForm<typeof obecScheme, DeepPartial<ObecTable>>({
    defaultValue: initialValue ?? emptyObec,
    validate: (val) => mapValibotResult(v.safeParse(obecScheme, val)),
    onSubmit: async (v) => {
      setState("posting");
      const {
        data: {
          cover: { blob, ...cover } = { url: "" },
          characteristics = [],
          buildings = [],
          ...data
        },
        ...value
      } = v as DeepPartial<ObecTable> & Output<typeof obecScheme>;

      if (!save) return;

      const prefix = "obec/" + initialValue?.id;

      const [coverImg, cImages, bImages] = await Promise.all([
        blob && upload(prefix + "/cover", cover.url, blob),
        Promise.all(
          (characteristics as Output<typeof figureSchema>[]).map(
            ({ blob, ...c }, i) =>
              blob && upload(`${prefix}/char/${i}`, c.url, blob)
          ) ?? []
        ),
        Promise.all(
          (buildings as Output<typeof figureSchema>[]).map(
            ({ blob, ...b }, i) =>
              blob && upload(`${prefix}/buildings/${i}`, b.url, blob)
          ) ?? []
        ),
      ]);

      console.log("calling save");

      const payload = {
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
      };
      console.log(payload);

      const insertedResult = await save(payload);

      console.log(insertedResult);

      if (insertedResult) {
        fetch(`/api/prerender-pdf/${insertedResult.id}`, {
          method: "HEAD",
        });

        if (!id) {
          router.push(`/admin/obec/${insertedResult.id}`);
        } else {
          form.setValue(insertedResult);
        }
        alert("Uloženo");
        setState("ready");
      } else {
        setState("ready");
        alert("Nebylo mozne ulozit obec");
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

const upload = async (path: string, url: string | undefined, blob: Blob) => {
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

export const getImageSize = (blob: Blob) =>
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
