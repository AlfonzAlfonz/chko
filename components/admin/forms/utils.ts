import { put } from "@vercel/blob";

export const upload = async <
  T extends { url?: string; blob?: Blob } | undefined
>(
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
    return _f as any;
  } else {
    const { blob, ...file } = _f;
    file.url && URL.revokeObjectURL(file.url);

    const size = await getImageSize(blob);

    if (!size) throw new Error("Invalid file");

    const result = await put(path + blob.name, blob, {
      access: "public",
      addRandomSuffix: true,
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
