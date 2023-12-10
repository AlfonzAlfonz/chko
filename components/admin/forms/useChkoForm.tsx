import { ChkoTable, chkoScheme } from "@/lib/chko";
import { put } from "@vercel/blob";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import * as v from "valibot";
import { DeepPartial, mapValibotResult, useForm } from "./useForm";

export const useChkoForm = ({
  initialValue,
  onSubmit: save,
}: {
  initialValue?: ChkoTable;
  onSubmit?: (chko: ChkoTable) => Promise<ChkoTable>;
}) => {
  const { id } = useParams() ?? {};
  const router = useRouter();
  const [state, setState] = useState<"posting" | "ready">("ready");
  const form = useForm<typeof chkoScheme, DeepPartial<ChkoTable>>({
    defaultValue: initialValue ?? emptyChko,
    validate: (val) => mapValibotResult(v.safeParse(chkoScheme, val)),
    onSubmit: async (v) => {
      setState("posting");

      if (!save) return;

      const prefix = "chko/" + initialValue?.id;

      const figures = await Promise.all(
        v.data.figures
          .filter(Boolean)
          .map((c, i) => upload(`${prefix}/char/${i}`, c)) ?? []
      );
      const payload = {
        ...v,
        id: v.id!,
        data: {
          ...v.data,
          figures,
        },
      } satisfies ChkoTable;

      const insertedResult = await save(payload);

      if (insertedResult) {
        if (!id) {
          router.push(`/admin/chko/${insertedResult.id}`);
        } else {
          form.setValue(insertedResult);
        }
        alert("Uloženo");
        setState("ready");
      } else {
        setState("ready");
        alert("Nebylo mozne ulozit chko");
      }
    },
  });

  return { ...form, state };
};

const emptyChko: DeepPartial<ChkoTable> = {
  name: "",
  data: {
    list1Title: "",
    list1: [],
    list2Title: "",
    list2: [],
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
