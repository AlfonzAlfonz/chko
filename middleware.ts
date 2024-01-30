import { NextMiddleware } from "next/server";
import { db } from "./lib/db";
import { NextResponse } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";

const middleware: NextMiddleware = async (req) => {
  console.log(req.nextUrl.pathname);
  if (req.nextUrl.pathname === "/vyzkumnazprava") {
    return NextResponse.rewrite(
      cloneUrl(
        req.nextUrl,
        (u) => (u.pathname = "/TL03000439 - Souhrnna vyzkumna zprava.pdf")
      )
    );
  }
  if (req.nextUrl.pathname.startsWith("/obec")) {
    const [, , id, slug] = req.nextUrl.pathname.split("/");

    if (Object.is(+id!, NaN)) {
      return NextResponse.next();
    }

    const { slug: correctSlug } =
      (await db
        .selectFrom("cities")
        .where("id", "=", +id!)
        .select("slug")
        .executeTakeFirst()) ?? {};

    if (correctSlug !== slug) {
      const url = req.nextUrl.clone();
      return NextResponse.redirect(
        cloneUrl(
          req.nextUrl,
          (u) => (u.pathname = `/obec/${id}/${correctSlug}`)
        )
      );
    }
  }

  return NextResponse.next();
};

export default middleware;

export const config = {
  matcher: ["/obec/:id*", "/vyzkumnazprava"],
};

const cloneUrl = (url: NextURL, map: (url: NextURL) => void) => {
  const result = url.clone();
  map(result);
  return result;
};
