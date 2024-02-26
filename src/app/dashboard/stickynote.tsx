"use client";
import { SetStateAction, useState } from "react";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../api/trpc/[trpc]/route";
import { now } from "next-auth/client/_utils";

export type NoteProp = {
  id: number;
  userid: number;
  title: string;
  content: string;
  updatedAt: string;
};

export function Stickynote(note: NoteProp) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [time, setTime] = useState(note.updatedAt);
  const id = note.id;

  const changeTitle = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setTitle(event.target.value);
  };

  const changeContent = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setContent(event.target.value);
  };

  const trpc = createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "http://localhost:3000/api/trpc",
      }),
    ],
  });

  return (
    <div className="flex w-1/4 flex-col rounded-sm border-2 border-black bg-yellow-200 shadow-xl">
      <form key={id}>
        <textarea
          maxLength={42}
          value={title}
          onChange={changeTitle}
          className="h-10 w-full resize-none bg-yellow-300 px-2 pt-1.5 text-xl outline-none"
        ></textarea>
        <textarea
          maxLength={512}
          value={content}
          onChange={changeContent}
          className="text-md h-56 w-full resize-none bg-inherit px-2 outline-none"
        ></textarea>
        <div className="flex flex-row border border-black">
          <h2 className="w-2/3 border border-black p-2 text-xs italic">
            {time}
          </h2>
          <input
            type="submit"
            formAction={async () => {
              const updatedNote = await trpc.saveNote.mutate({
                id,
                title,
                content,
              });
              setTime(updatedNote.updatedAt);
            }}
            className="w-1/3 cursor-pointer border border-black"
          ></input>
        </div>
      </form>
    </div>
  );
}
