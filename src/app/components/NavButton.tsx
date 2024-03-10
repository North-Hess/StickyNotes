import Link from "next/link";

export default function NavButton(props: { text: string; redirect: string }) {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex h-8 flex-col justify-center rounded bg-gray-700 ring-2 ring-gray-700">
        <button className="mx-2 h-6 font-mono text-base transition-colors duration-300 ease-in-out hover:text-gray-300">
          <Link href={props.redirect}>{props.text}</Link>
        </button>
      </div>
    </div>
  );
}
