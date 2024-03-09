import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { z } from "zod";
import { createContextInner } from "./context";
import { NextRequest } from "next/server";
import { router, publicProcedure } from "@/app/server/api/router";

const appRouter = router({
  getUserId: publicProcedure
    .input(z.object({ userEmail: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.user.findUnique({
        where: {
          email: input.userEmail,
        },
      });
    }),
  getNotes: publicProcedure
    .input(z.object({ userEmail: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.userEmail,
        },
      });
      return ctx.prisma.note.findMany({
        where: {
          userId: {
            equals: user?.id || "",
          },
        },
      });
    }),
  saveNote: publicProcedure
    .input(z.object({ id: z.string(), title: z.string(), content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.note.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          content: input.content,
        },
      });
    }),
  createNote: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        title: z.string(),
        content: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.note.create({
        data: {
          userId: input.userId,
          title: input.title,
          content: input.content,
        },
      });
    }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "api/trpc",
    req,
    router: appRouter,
    async createContext() {
      return createContextInner({
        req,
      });
    },
  });

export { handler as GET, handler as POST };
