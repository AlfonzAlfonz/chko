import { ThemeRegistry } from "@/components/admin/ThemeRegistry";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import Link from "next/link";
import { Button } from "@mui/joy";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CHKO",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Link href="/login">
          <Button component="div">Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={`${inter.className} min-h-screen flex`}>
      <ThemeRegistry>{children}</ThemeRegistry>
    </div>
  );
}
