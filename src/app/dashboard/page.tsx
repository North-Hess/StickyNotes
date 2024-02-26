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

  const userId = await trpc.getUser.query(session.user.email ?? "");
  const notes = await trpc.getNotes.query(userId?.id ?? 0);

  return (
    <main>
      <h1>This is the dashboard page</h1>
      <div className="flex w-full flex-row flex-wrap justify-center gap-8">
        {notes.map((note) => (
          <Stickynote {...note} key={note.id} />
        ))}
      </div>
    </main>
  );
}
