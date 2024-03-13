"use client";
import Image from "next/image";

export function ThemeToggle() {
  return (
    <button
      className="mr-4 h-8"
      onClick={() => {
        const html = document.getElementById("html");
        if (html && html.classList.contains("dark")) {
          html.classList.remove("dark");
        } else if (html) {
          html?.classList.add("dark");
        }
      }}
    >
      <Image
        src="/darkmode.png"
        alt="Dark mode icon"
        height={32}
        width={32}
        className="dark:hidden"
        id="darkicon"
      />
      <Image
        src="/lightmode.svg"
        alt="Light mode icon"
        height={32}
        width={32}
        className="hidden dark:block"
        id="lighticon"
      />
    </button>
  );
}
