import { getAuth } from "../api/auth/[...nextauth]/route";
import { AuthButton } from "./AuthButton";
import { ProfilePicture } from "./ProfilePicture";

export default async function NavBar() {
  const session = await getAuth();
  return (
    <div className="flex flex-row border border-black bg-slate-400 p-2">
      <ProfilePicture session={session} />
      <AuthButton session={session} />
    </div>
  );
}
