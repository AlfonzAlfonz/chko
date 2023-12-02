import { delPdfEntries, getPdfEntries, putPdfEntry } from "@/lib/pdfCache";
import { renderPdf } from "@/lib/renderPdf";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    res.status(401).end("No auth");
    return;
  }

  if (!["GET", "HEAD"].includes(req.method!)) {
    res.status(405).end("Invalid method");
  }

  const id = +[req.query.id].flat()[0]!;

  if (!id) {
    res.status(400).end("Invalid id");
    return;
  }

  const key = `/obec/pdf/${id}.pdf`;

  const entries = await getPdfEntries(key);

  const pdf = await renderPdf(id);

  if (!pdf) {
    res.status(400).end("Error rendering pdf");
    return;
  }

  await putPdfEntry(key, pdf);

  await delPdfEntries(key, entries);

  if (req.method === "GET") {
    res.end(pdf);
  }
};

export default handler;
