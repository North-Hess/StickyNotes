import { Stickynote } from "./stickynote";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("api/auth/signin");
  }

  return (
    <main>
      <h1>This is the dashboard page</h1>
      <div className="flex flex-row flex-wrap w-full justify-center gap-8">
        <Stickynote />
        <Stickynote />
        <Stickynote />
      </div>
    </main>
  );
}
