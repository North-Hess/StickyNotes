import { redirect } from "next/navigation";
import { StickyNotes } from "../components/StickyNote";
import { getAuth } from "../api/auth/[...nextauth]/getAuth";
import { trpc } from "../api/trpc/[trpc]/trpcClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Personal notes",
};

export default async function Dashboard() {
  const session = await getAuth();
  if (!session || !session.user || !session.user.email) {
    redirect("api/auth/signin");
  }
  const email = session.user.email;
  const user = await trpc.getUserId.query({ userEmail: email });
  const notes = await trpc.getNotes.query({ userEmail: email });

  return (
    <div className="my-10">
      <StickyNotes currentNotes={notes} userId={user?.id || ""} />
    </div>
  );
}
