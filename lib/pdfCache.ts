import { del, list, put } from "@vercel/blob";

export const getPdfEntries = async (key: string) => {
  const { blobs } = await list({
    token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
    prefix: "/obec/pdf",
  });

  return blobs
    .filter((b) => b.pathname === key)
    .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
};

export const putPdfEntry = async (key: string, pdf: Buffer) =>
  await put(key, pdf, {
    access: "public",
    token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
  });

export const delPdfEntries = async (
  key: string,
  entries: Awaited<ReturnType<typeof list>>["blobs"]
) => {
  await del(
    entries.map((e) => e.url),
    {
      token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
    }
  );
};
