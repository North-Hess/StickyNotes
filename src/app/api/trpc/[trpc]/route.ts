import { PrismaClient } from "@prisma/client";
import { publicProcedure, router } from "@/app/server/api/router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { getServerSession } from "next-auth";
import { z } from "zod";

const prisma = new PrismaClient();
const appRouter = router({
  getUser: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    const user = await prisma.user.findUnique({
      where: {
        email: input,
      },
    });
    return user;
  }),
  getNotes: publicProcedure.input(z.number()).query(async (opts) => {
    const { input } = opts;
    const notes = await prisma.note.findMany({
      where: {
        userid: {
          equals: input,
        },
      },
    });
    return notes;
  }),
  getNote: publicProcedure.input(z.number()).query(async (opts) => {
    const { input } = opts;
    const note = await prisma.note.findUnique({
      where: {
        id: input,
      },
    });
    return note;
  }),
  saveNote: publicProcedure
    .input(z.object({ id: z.number(), title: z.string(), content: z.string() }))
    .mutation(async (opts) => {
      const { id, title, content } = opts.input;
      const updatedNote = await prisma.note.update({
        where: {
          id: id,
        },
        data: {
          title: title,
          content: content,
        },
      });
      return updatedNote;
    }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "api/trpc",
    req,
    router: appRouter,
    createContext: () => getServerSession(),
  });

export { handler as GET, handler as POST };
