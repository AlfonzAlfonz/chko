import { MapLayoutClient } from "@/app/(web)/(map)/MapLayoutClient";
import { ChkoListProvider } from "@/components/contexts";
import { db } from "@/lib/db";
import { ReactNode } from "react";

const Template = async ({ children }: { children: ReactNode }) => {
  const chkos = await getData();

  return (
    <ChkoListProvider value={chkos}>
      <MapLayoutClient>{children}</MapLayoutClient>
    </ChkoListProvider>
  );
};

export default Template;

const getData = async () => {
  return await db.selectFrom("chkos").select(["id", "name", "data"]).execute();
};
