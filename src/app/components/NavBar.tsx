import { getAuth } from "../api/auth/[...nextauth]/route";
import { AuthButton } from "./AuthButton";
import { ProfilePicture } from "./ProfilePicture";
import NavButton from "./NavButton";

export default async function NavBar() {
  const session = await getAuth();
  return (
    <div className="flex h-16 flex-row justify-between border-b border-gray-700 bg-black p-2 text-white first:pl-8">
      <nav className="flex flex-row gap-x-10">
        <NavButton text="Home" redirect="/" />
        <NavButton text="Dashboard" redirect="/dashboard" />
        <AuthButton session={session} />
      </nav>
      <div className="pr-4">
        <ProfilePicture session={session} />
      </div>
    </div>
  );
}
