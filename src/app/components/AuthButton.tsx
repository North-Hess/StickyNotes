"use client";
import { SessionProp } from "./SessionProp";
import { signOut, signIn } from "next-auth/react";

export function AuthButton({ session }: SessionProp) {
  if (session) {
    return (
      <div className="flex flex-col justify-center">
        <div className="flex h-8 flex-col justify-center rounded bg-gray-200 ring-2 ring-gray-200 dark:bg-gray-700 dark:ring-gray-700">
          <button
            className="mx-2 h-6 font-mono text-base tracking-tight text-black transition-colors duration-300 ease-in-out hover:text-gray-500 dark:text-white dark:hover:text-gray-300"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center">
      <div className="flex h-8 flex-col justify-center rounded bg-gray-200 ring-2 ring-gray-200 dark:bg-gray-700 dark:ring-gray-700">
        <button
          className="mx-2 h-6 font-mono text-base tracking-tight text-black transition-colors duration-300 ease-in-out hover:text-gray-500 dark:text-white dark:hover:text-gray-300"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
