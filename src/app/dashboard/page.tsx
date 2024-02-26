import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Stickynote } from "./stickynote";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../api/trpc/[trpc]/route";

export default async function Dashboard() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("api/auth/signin");
  }
  const trpc = createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "http://localhost:3000/api/trpc",
      }),
    ],
  });

  const users = await trpc.userList.query();

  return (
    <main>
      <h1>This is the dashboard page, {users[0].email}</h1>
      <div className="flex w-full flex-row flex-wrap justify-center gap-8">
        <Stickynote />
        <Stickynote />
        <Stickynote />
      </div>
    </main>
  );
}
