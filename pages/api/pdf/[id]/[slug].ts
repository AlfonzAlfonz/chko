import { getChkoPdfEntry } from "@/lib/pdfCache";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = +[req.query.id].flat()[0]!;

  if (!id) {
    res.status(400).end("Invalid id");
    return;
  }

  const entry = await getChkoPdfEntry(id);

  if (entry) {
    res.redirect(entry.url).end();
    if (isStale(entry.uploadedAt)) {
      await fetch(
        `/api/invoke-puppeteer/${id}?staleEntry=${encodeURIComponent(
          entry.url
        )}`,
        { redirect: "manual" }
      ).catch(() => null);
    }
  } else {
    res.redirect(`/api/invoke-puppeteer/${id}`);
  }
};

export default handler;

const isStale = (uploadedAt: number) =>
  Date.now() - uploadedAt >= 30 * 60 * 1000;
