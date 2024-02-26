"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import type { SessionProp } from "./SessionProp";

function AuthButton({ session }: SessionProp) {
  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

function ProfilePicture({ session }: SessionProp) {
  return (
    <>
      <div className="h-16 w-16">
        <Image
          src={session?.user?.image ?? "/next.svg"}
          width={64}
          height={64}
          alt="User profile picture"
          className="rounded-full border border-black"
          placeholder="data:image/svg,/next.svg"
        />
      </div>
      <div className="flex h-auto flex-col justify-center border border-black px-4">
        <text className="">
          Welcome{session ? " " + session?.user?.name?.split(" ")[0] : ""}!
        </text>
      </div>
    </>
  );
}

export default function NavBar() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-row border border-black bg-slate-400 p-2">
      <ProfilePicture session={session} />
      <AuthButton session={session} />
    </div>
  );
}
