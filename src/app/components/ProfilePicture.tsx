import Image from "next/image";
// import type { SessionProp } from "./SessionProp";
import { getAuth } from "../api/auth/[...nextauth]/getAuth";

export async function ProfilePicture() {
  const session = await getAuth();
  return (
    <Image
      src={session?.user?.image ?? "/favicon.ico"}
      width={48}
      height={48}
      alt="User profile picture"
      className="rounded-full border border-black"
      placeholder="data:image/png,/notepad.png"
    />
  );
}
