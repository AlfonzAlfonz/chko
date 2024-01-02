import { del, list, put } from "@vercel/blob";
import { db } from "./db";

export type ListBlobResultBlob = Awaited<
  ReturnType<typeof list>
>["blobs"][number];

export const getPdfEntries = async (id: number) => {
  const key = getPdfKey(id);

  const { blobs } = await list({
    token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
    prefix: "obec/pdf",
  });

  return blobs
    .filter((b) => b.pathname === key)
    .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
};

export const getChkoPdfEntry = async (id: number) => {
  const chko = await db
    .selectFrom("cities")
    .where("id", "=", id)
    .select("pdf")
    .executeTakeFirst();
  return chko?.pdf ?? null;
};

export const putPdfEntry = async (key: string, pdf: Buffer) =>
  await put(key, pdf, {
    access: "public",
    token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
  });

export const delPdfEntries = async (key: string, entries: string[]) => {
  await del(entries, {
    token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
  });
};

export const getPdfKey = (id: number) => `/obec/pdf/${id}.pdf`;
