import { Stickynote } from "./stickynote";

export default function Dashboard() {
  return (
    <main>
      <h1>This is the dashboard page</h1>
      <div className="flex flex-row flex-wrap w-full justify-center gap-8">
        <Stickynote />
        <Stickynote />
        <Stickynote />
      </div>
    </main>
  );
}
