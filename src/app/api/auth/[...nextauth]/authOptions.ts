import Github from "next-auth/providers/github";
import prisma from "@/app/server/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";

export const authOptions = {
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
