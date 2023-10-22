import { ThemeRegistry } from "@/components/admin/ThemeRegistry";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CHKO",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} min-h-screen flex`}>
      <ThemeRegistry>{children}</ThemeRegistry>
    </div>
  );
}
