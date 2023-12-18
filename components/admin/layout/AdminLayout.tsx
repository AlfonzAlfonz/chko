import { db } from "@/lib/db";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import logo from "@/public/static/logo.svg";
import Terrain from "@mui/icons-material/Terrain";
import ListIcon from "@mui/icons-material/List";
import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
} from "@mui/joy";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { LoginMenu } from "./LoginMenu";

export const AdminLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);
  const chkos = await getData();

  return (
    <div className="flex w-full">
      <Card
        variant="outlined"
        className="!pb-0"
        sx={{
          borderRadius: "0",
          borderLeft: "none",
          borderTop: "none",
          borderBottom: "none",
        }}
      >
        <Image
          src={logo}
          alt="logo"
          className="invert mb-4 h-[130px] mx-auto mt-3"
        />
        <List>
          <ListItem>
            <Link href={`/admin`} className="self-stretch w-full">
              <ListItemButton>
                <ListItemDecorator>
                  <ListIcon />
                </ListItemDecorator>
                <ListItemContent>Seznam CHKO</ListItemContent>
              </ListItemButton>
            </Link>
          </ListItem>
          {chkos.map((c) => (
            <ListItem key={c.id}>
              <Link
                href={`/admin/chko/${c.id}/list`}
                className="self-stretch w-full"
              >
                <ListItemButton>
                  <ListItemDecorator>
                    <Terrain />
                  </ListItemDecorator>
                  <ListItemContent>{c.name}</ListItemContent>
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <div className="sticky bottom-0">
          <Divider />
          <LoginMenu username={session?.user?.name ?? undefined} />
        </div>
      </Card>
      <div className="flex-1 bg-[#f9f9f9]">{children}</div>
    </div>
  );
};

const getData = async () => {
  return await db.selectFrom("chkos").select(["id", "name"]).execute();
};
