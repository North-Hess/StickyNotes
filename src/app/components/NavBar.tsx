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
  if (session) {
    return (
      <>
        <div className="h-16 w-16">
          <Image
            src={session?.user?.image ?? "/next.svg"}
            width={64}
            height={64}
            alt="User profile picture"
            className="border border-black rounded-full"
            placeholder="data:image/next.svg"
          />
        </div>
        <div className="flex flex-col h-auto justify-center px-4 border border-black">
          <text className="">
            Welcome {session?.user?.name?.split(" ")[0] || ""}!
          </text>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="h-16 w-16">
        <Image
          src={""}
          width={64}
          height={64}
          alt="User profile picture"
          className="border border-black rounded-full"
        />
      </div>
      <div className="flex flex-col h-auto justify-center px-4 border border-black">
        <text className="">Welcome</text>
      </div>
    </>
  );
}

export default function NavBar() {
  const { data: session } = useSession();
  return (
    <div className="bg-slate-400 p-2 flex flex-row border border-black">
      <ProfilePicture session={session} />
      <AuthButton session={session} />
    </div>
  );
}
