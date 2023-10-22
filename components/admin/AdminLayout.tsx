import logo from "@/public/static/logo.svg";
import Home from "@mui/icons-material/Home";
import {
  Card,
  Divider,
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
import { authOptions } from "@/app/(admin)/api/auth/[...nextauth]/route";

export const AdminLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

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
          <ListItem>
            <Link href="/admin" className="self-stretch w-full">
              <ListItemButton>
                <ListItemDecorator>
                  <Home />
                </ListItemDecorator>
                <ListItemContent>Obce</ListItemContent>
              </ListItemButton>
            </Link>
          </ListItem>
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
