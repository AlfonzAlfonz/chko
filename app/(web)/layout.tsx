import { ObecListProvider } from "@/components/contexts";
import { db } from "@/lib/db";
import { ReactNode } from "react";

export const dynamic = "error";
export const dynamicParams = true;
export const revalidate = 30;

const getData = async () => {
  return await db
    .selectFrom("cities")
    .select(["id", "metadata", "slug"])
    .execute()
    .then((d) =>
      d.sort((a, b) => a.metadata.name.localeCompare(b.metadata.name))
    );
};

const Layout = async ({ children }: { children: ReactNode }) => {
  const obecList = await getData();

  return <ObecListProvider value={obecList}>{children}</ObecListProvider>;
};

export default Layout;
