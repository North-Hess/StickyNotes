import { InfoCard } from "./components/InfoCard";

export default function Home() {
  const whyContent =
    "I was tired of being in tutorial hell." +
    " I decided to just jump in and create something simple using the technologies" +
    " I had seen so much about. I learned a lot and am glad I finally just jumped in." +
    "As I hit issues any needed more functionality I added the pieces I needed, then consulted " +
    "the docs for it to implement what was chosen.";
  const techContent =
    "I started with a basic Next app and Tailwind. These allowed me to get " +
    "a basic page made. From there I needed a database to start implementing " +
    "sticky note functionality. For this I went with Prisma, TRPC, and Planetscale " +
    "(Turso for the future). Last was NextAuth. I chose this for the " +
    "experience of implementing authentication rather than a more abstract service like Clerk";
  const lessonsContent =
    "Balancing between client and server components is challenging, but I feel as though I have " +
    "struck a balance that works well for me. Along with that is user sessions and passing necessary data between the two. " +
    "However, prisma and TRPC made working with my DB very pleasant. The adapter for prisma in NextAuth allowed for session " +
    "management to be much easier. At the end, Tailwind helped greatly with crafting a better UI quicker. I just need more practice " +
    "building a UI in general.";
  return (
    <>
      <div className="grid h-80 w-full grid-cols-1 content-center">
        <h1 className="text-center font-mono text-6xl font-bold tracking-tight text-black dark:text-white">
          Notetaking Done Simple
        </h1>
        <h2 className="mt-2 text-center font-mono text-xl tracking-tight text-black dark:text-white">
          Create, modify, and save notes for future reference.
        </h2>
      </div>
      <div className="mb-8 flex justify-center">
        <div className="grid w-4/5 grid-cols-3">
          <InfoCard title="Why?" content={whyContent} />
          <InfoCard title="Tech Chosen" content={techContent} />
          <InfoCard title="Lessons" content={lessonsContent} />
        </div>
      </div>
    </>
  );
}
