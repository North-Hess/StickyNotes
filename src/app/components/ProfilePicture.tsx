import Image from "next/image";
import type { SessionProp } from "./SessionProp";
import Link from "next/link";

export function ProfilePicture({ session }: SessionProp) {
  return (
    <>
      <div className="h-16 w-16">
        <Link href={"/"}>
          <Image
            src={session?.user?.image ?? "/next.svg"}
            width={64}
            height={64}
            alt="User profile picture"
            className="rounded-full border border-black"
            placeholder="data:image/svg,/next.svg"
          />
        </Link>
      </div>
      <div className="flex h-auto flex-col justify-center border border-black px-4">
        <p className="">
          Welcome{session ? " " + session?.user?.name?.split(" ")[0] : ""}!
        </p>
      </div>
    </>
  );
}
