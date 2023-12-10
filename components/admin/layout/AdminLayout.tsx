import logo from "@/public/static/logo.svg";
import Home from "@mui/icons-material/Home";
import {
  Card,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
} from "@mui/joy";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { LoginMenu } from "./LoginMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/lib/db";
import Edit from "@mui/icons-material/Edit";

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
        <Image src={logo} alt="logo" className="invert mb-2" />
        <List>
          {chkos.map((c) => (
            <ListItem
              key={c.id}
              endAction={
                <Link
                  href={`/admin/chko/${c.id}/edit`}
                  className="self-stretch w-full"
                >
                  <IconButton component="div" size="sm">
                    <Edit />
                  </IconButton>
                </Link>
              }
            >
              <Link
                href={`/admin/chko/${c.id}/list`}
                className="self-stretch w-full"
              >
                <ListItemButton>
                  <ListItemDecorator>
                    <Home />
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
