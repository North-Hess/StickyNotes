import Image from "next/image";
import type { SessionProp } from "./SessionProp";

export function ProfilePicture({ session }: SessionProp) {
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
