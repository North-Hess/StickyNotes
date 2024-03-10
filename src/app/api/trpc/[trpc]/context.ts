import { GetServerSidePropsContext } from "next";
import { NextRequest } from "next/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import prisma from "@/app/server/db";

type CreateContextOptions = {
  req: NextRequest | GetServerSidePropsContext["req"] | null;
};

export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    req: opts.req,
    prisma,
  };
};

export const createContext = async (opts: CreateNextContextOptions) => {
  return await createContextInner({
    req: opts.req,
  });
};

export type Context = Awaited<typeof createContext>;
