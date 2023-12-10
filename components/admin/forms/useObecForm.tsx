import { put } from "@vercel/blob";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import getSlug from "speakingurl";
import * as v from "valibot";
import { DeepPartial, mapValibotResult, useForm } from "./useForm";
import { ObecTable, obecScheme } from "@/lib/obec";

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

      if (!save) return;

      const prefix = "obec/" + initialValue?.id;

      const [cover, characteristics, buildings] = await Promise.all([
        upload(prefix + "/cover", v.data.cover),
        Promise.all(
          v.data.characteristics
            .filter(Boolean)
            .map((c, i) => upload(`${prefix}/char/${i}`, c)) ?? []
        ),
        Promise.all(
          v.data.buildings
            .filter(Boolean)
            .map((b, i) => upload(`${prefix}/buildings/${i}`, b)) ?? []
        ),
      ]);

      const payload = {
        ...v,
        id: v.id!,
        slug: getSlug(v.metadata.name),
        published: false,
        data: {
          ...v.data,
          cover,
          characteristics,
          buildings,
        },
      } satisfies ObecTable;

      const insertedResult = await save(payload);

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

const upload = async <T extends { url?: string; blob?: Blob } | undefined>(
  path: string,
  _f: T
): Promise<
  | (Omit<T extends infer U | undefined ? U : never, "blob"> & {
      url: string;
      caption: string;
      width: number;
      height: number;
    })
  | Exclude<T, T extends infer U | undefined ? U : never>
> => {
  if (_f === undefined) return undefined!;

  if (!_f.blob) {
    console.log(_f);
    return _f as any;
  } else {
    const { blob, ...file } = _f;
    file.url && URL.revokeObjectURL(file.url);

    const size = await getImageSize(blob);

    if (!size) throw new Error("Invalid file");

    const result = await put(path + blob.name, blob, {
      access: "public",
      token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
    });
    return {
      ...file,
      url: result.url,
      width: size[0],
      height: size[1],
    } as any;
  }
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
