import { redirect } from "next/navigation";
import { Stickynote } from "./stickynote";
import { getAuth } from "../api/auth/[...nextauth]/route";
import { trpc } from "../api/trpc/[trpc]/trpcClient";

export default async function Dashboard() {
  const session = await getAuth();
  if (!session || !session.user || !session.user.email) {
    redirect("api/auth/signin");
  }

  const notes = await trpc.getNotes.query({ userEmail: session.user.email });

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
