import { PrismaClient } from "@prisma/client";
import { publicProcedure, router } from "@/app/server/api/router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();
const appRouter = router({
  userList: publicProcedure.query(async () => {
    const users = await prisma.user.findMany();

    return users;
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
