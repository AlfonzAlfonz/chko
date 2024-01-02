import { db } from "@/lib/db";
import { putPdfEntry, delPdfEntries, getPdfKey } from "@/lib/pdfCache";
import { renderPdf } from "@/lib/renderPdf";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = +[req.query.id].flat()[0]!;
  const stateEntries = [req.query.stateEntry ?? []].flat();
  const key = getPdfKey(id);

  const pdf = await renderPdf(id);

  if (!pdf) {
    res.status(400).end("Error rendering pdf");
    return;
  }

  const { url } = await putPdfEntry(key, pdf);

  await db
    .updateTable("cities")
    .where("id", "=", id)
    .set({ pdf: { url: url, uploadedAt: Date.now() } })
    .execute();

  res.redirect(url).end();

  await delPdfEntries(key, stateEntries);
};

export default handler;
