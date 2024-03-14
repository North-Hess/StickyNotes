import type { Metadata } from "next";
import NavBar from "./components/NavBar";
import "./globals.css";
import SessionProvider from "./components/SessionProvider";

export const metadata: Metadata = {
  title: "StickyNotes",
  description: "Create and manage personal notes",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" id="html">
      <body className="bg-white dark:bg-black">
        <SessionProvider>
          <header>
            <NavBar />
          </header>
          <main>{children}</main>
        </SessionProvider>
        <footer className="pl-2 text-center font-mono tracking-tight text-black dark:text-white">
          Built by{" "}
          <a
            href="https://github.com/North-Hess/"
            className="underline underline-offset-4"
          >
            North Hess
          </a>
        </footer>
      </body>
    </html>
  );
}
