// import { getAuth } from "../api/auth/[...nextauth]/getAuth";
import { AuthButton } from "./AuthButton";
import { ProfilePicture } from "./ProfilePicture";
import NavButton from "./NavButton";
import { ThemeToggle } from "./ThemeToggle";
import { Suspense } from "react";

export default async function NavBar() {
  return (
    <div className="flex h-16 flex-row justify-between border-b border-gray-700 p-2 text-white first:pl-8">
      <nav className="flex flex-row gap-x-10">
        <NavButton text="Home" redirect="/" />
        <NavButton text="Dashboard" redirect="/dashboard" />
        <AuthButton />
      </nav>
      <div className="flex flex-row">
        <div className="flex flex-col justify-center">
          <ThemeToggle />
        </div>
        <div className="pr-4">
          <Suspense>
            <ProfilePicture />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
