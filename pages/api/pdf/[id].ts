import { del, list, put } from "@vercel/blob";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const baseurl = getBaseUrl();
  try {
    const id = +[req.query.id].flat()[0]!;

    if (!id) {
      res.status(400).end("Invalid id");
      return;
    }

    const key = `/obec/pdf/${id}.pdf`;

    const { blobs } = await list({
      token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
      prefix: "/obec/pdf",
    });

    const cached = blobs.find((b) => b.pathname === key);

    if (cached) {
      if (Date.now() - cached.uploadedAt.getTime() < 30 * 60 * 1000) {
        res.redirect(cached.url).end();
        return;
      } else {
        await del(cached.url, {
          token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
        });
      }
    }

    const browser = await getBrowser();

    try {
      const page = await browser.newPage();
      await page.setJavaScriptEnabled(false);

      await page.goto(joinUri(baseurl, `/pdf/html/${+req.query.id!}`), {
        waitUntil: "networkidle0",
      });
      const pdf = await page.pdf({
        scale: 1,
        displayHeaderFooter: false,
        printBackground: true,
        format: "a4",
      });

      const { url } = await put(key, pdf, {
        access: "public",
        token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
      });
      res.redirect(url).end();
    } catch (e) {
      throw e;
    } finally {
      await browser.close();

      if (
        cached &&
        Date.now() - cached.uploadedAt.getTime() >= 30 * 60 * 1000
      ) {
        await del(cached.url, {
          token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
        });
      }
    }
  } catch (e: any) {
    console.error(e);
    if (!res.headersSent) {
      res.status(400).send(
        JSON.stringify({
          e,
          msg: e.msg,
          idk: { ...e },
          baseurl,
          vercel_url: process.env.VERCEL_URL,
          pup_url: process.env.PUP_URL,
          page: joinUri(baseurl, `/pdf/html/${+req.query.id!}`),
        })
      );
    }
  }
};

export default handler;

const getBrowser = async () =>
  await puppeteer.launch(
    t({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    })
  );

const getBaseUrl = () =>
  (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
  process.env.PUP_URL!;

const joinUri = (a: string, b: string) =>
  (a.endsWith("/") && !b.startsWith("/")) ||
  (!a.endsWith("/") && b.startsWith("/"))
    ? `${a}${b}`
    : a.endsWith("/") && b.endsWith("/")
    ? `${a}${b.slice(1)}`
    : `${a}/${b}`;

const clear = async () => {
  const { blobs } = await list({
    token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
    prefix: "/obec/pdf",
  });

  blobs.length &&
    (await del(
      blobs.map((b) => b.url),
      { token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN }
    ));
};

const t = <T>(x: T): T => {
  console.log(x);
  return x;
};
