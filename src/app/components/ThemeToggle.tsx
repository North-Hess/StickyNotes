"use client";
import Image from "next/image";
import { useEffect } from "react";

export function ThemeToggle() {
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });
  return (
    <button
      className="mr-4 h-8"
      onClick={() => {
        if (document.documentElement.classList.contains("dark")) {
          localStorage.theme = "light";
          document.documentElement.classList.remove("dark");
        } else {
          localStorage.theme = "dark";
          document.documentElement.classList.add("dark");
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
