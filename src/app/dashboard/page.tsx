import { redirect } from "next/navigation";
import { StickyNotes } from "./StickyNote";
import { getAuth } from "../api/auth/[...nextauth]/route";
import { trpc } from "../api/trpc/[trpc]/trpcClient";

export default async function Dashboard() {
  const session = await getAuth();
  if (!session || !session.user || !session.user.email) {
    redirect("api/auth/signin");
  }
  const email = session.user.email;
  const user = await trpc.getUserId.query({ userEmail: email });
  const notes = await trpc.getNotes.query({ userEmail: email });

  return (
    <main>
      <h1>This is the dashboard page</h1>
      {/* <div className="flex w-full flex-row flex-wrap justify-center gap-8">
        {notes.map((note) => (
          <Stickynote {...note} key={note.id} />
        ))}
        <NewNote userId={user?.id || ""} />
      </div> */}
      <StickyNotes currentNotes={notes} userId={user?.id || ""} />
    </main>
  );
}
