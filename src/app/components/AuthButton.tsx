"use client";
import { SessionProp } from "./SessionProp";
import { signOut, signIn } from "next-auth/react";

export function AuthButton({ session }: SessionProp) {
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
