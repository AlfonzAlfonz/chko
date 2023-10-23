import { ObecListProvider } from "@/components/contexts";
import { db } from "@/lib/db";
import { ReactNode } from "react";

const getData = async () => {
  return await db
    .selectFrom("cities")
    .select(["id", "metadata", "slug"])
    .execute();
};

const Layout = async ({ children }: { children: ReactNode }) => {
  const obecList = await getData();

  return <ObecListProvider value={obecList}>{children}</ObecListProvider>;
};

export default Layout;
