import { db } from "@/lib/db";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "j25&zCbzp&&Vm6njSEPj",
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.password || !credentials.username) return null;

        const user = await db
          .selectFrom("admins")
          .where("username", "=", credentials.username)
          .selectAll()
          .executeTakeFirst();
        if (!user) return null;

        if (await bcrypt.compare(credentials?.password, user.password_hash)) {
          return {
            id: String(user.id),
            name: user.username,
          };
        } else {
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
