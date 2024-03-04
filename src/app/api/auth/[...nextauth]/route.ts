import NextAuth from "next-auth/next";
import Github from "next-auth/providers/github";
import prisma from "@/app/server/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Github({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "database",
    maxAge: 2 * 24 * 60 * 60, // Two day session
    updateAge: 24 * 60 * 60, // extend session every 24 hours
  },
} satisfies NextAuthOptions;

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export const getAuth = () => {
  return getServerSession(authOptions);
};
