import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export const renderPdf = async (id: number) => {
  const baseurl = getBaseUrl();

  let browser;

  try {
    browser = await getBrowser();
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(false);

    await page.goto(joinUri(baseurl, `/pdf/html/${id}`), {
      waitUntil: "networkidle0",
    });
    const pdf = await page.pdf({
      scale: 1,
      displayHeaderFooter: false,
      printBackground: true,
      format: "a4",
    });

    return pdf;
  } catch (e) {
    console.error(e);
    return null;
  } finally {
    await browser?.close();
  }
};

const getBrowser = async () =>
  await puppeteer.launch({
    // headless: "new",
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });

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
