import { initTRPC } from "@trpc/server";
import { Context } from "@/app/api/trpc/[trpc]/context";
import { transformer } from "./transformer";
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create({
  transformer,
  errorFormatter({ shape }) {
    return shape;
  },
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
