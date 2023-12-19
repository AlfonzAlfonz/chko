import { delPdfEntries, getPdfEntries, putPdfEntry } from "@/lib/pdfCache";
import { renderPdf } from "@/lib/renderPdf";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = +[req.query.id].flat()[0]!;
  const slug = +[req.query.id].flat()[0]!;

  if (!id) {
    res.status(400).end("Invalid id");
    return;
  }

  const key = `/obec/pdf/${id}/${slug}.pdf`;

  const entries = await getPdfEntries(key);
  const cached = entries[0];
  let sent = false;

  if (cached) {
    sent || res.redirect(cached.url).end();
    sent = true;
    if (!isStale(cached.uploadedAt)) {
      return;
    }
  }

  const pdf = await renderPdf(id);

  if (!pdf) {
    sent || res.status(400).end("Error rendering pdf");
    return;
  }

  const { url } = await putPdfEntry(key, pdf);

  sent || res.redirect(url).end();

  await delPdfEntries(key, entries);
};

export default handler;

const isStale = (uploadedAt: Date) =>
  Date.now() - uploadedAt.getTime() >= 30 * 60 * 1000;
