import sharp from "sharp";

export const dynamic = "force-dynamic";

const allowedHosts = [
  "fhg3p9dzdc6eo4av.public.blob.vercel-storage.com",
  new URL(process.env.NEXTAUTH_URL!).host,
];

const maxWidth = 400;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const img = url.searchParams.get("url");
  let width = Number(url.searchParams.get("width")) || maxWidth;

  if (!img) return new Response("Bad request", { status: 400 });
  if (width > maxWidth) width = maxWidth;

  const imgUrl = new URL(img, process.env.NEXTAUTH_URL);

  console.log(imgUrl.host);

  if (!allowedHosts.includes(imgUrl.host))
    return new Response("Bad request", { status: 400 });

  const input = await fetch(imgUrl);

  const data = await sharp(await input.arrayBuffer())
    .resize(width)
    .jpeg({ quality: 40 })
    .toBuffer();

  return new Response(data);
}
