import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Stickynote } from "./stickynote";

export default async function Dashboard() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("api/auth/signin");
  }

  return (
    <main>
      <h1>This is the dashboard page</h1>
      <div className="flex w-full flex-row flex-wrap justify-center gap-8">
        <Stickynote />
        <Stickynote />
        <Stickynote />
      </div>
    </main>
  );
}
