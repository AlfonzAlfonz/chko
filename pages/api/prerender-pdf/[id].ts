import { getPdfEntries } from "@/lib/pdfCache";
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

  const entries = await getPdfEntries(id);

  res.redirect(
    `/api/invoke-puppeteer/${id}?${entries.map(
      (e) => `staleEntry=${encodeURIComponent(e.url)}`
    )}`
  );
};

export default handler;
