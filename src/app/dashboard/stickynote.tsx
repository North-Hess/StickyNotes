"use client";
import { SetStateAction, useState } from "react";
import { trpc } from "../api/trpc/[trpc]/trpcClient";

export type NoteProp = {
  id?: string;
  userId: string;
  title: string;
  content: string;
  updatedAt?: Date;
};

function Stickynote(note: NoteProp) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [time, setTime] = useState(
    note.updatedAt?.toLocaleString() || "Unsaved",
  );
  const id = note.id;
  const userId = note.userId;

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

  return (
    <div className="flex w-1/4 flex-col rounded-sm border-2 border-black bg-yellow-200 shadow-xl">
      <textarea
        maxLength={42}
        placeholder="Title"
        value={title}
        onChange={changeTitle}
        className="h-10 w-full resize-none bg-yellow-300 px-2 pt-1.5 text-xl outline-none"
      ></textarea>
      <textarea
        maxLength={512}
        placeholder="Content"
        value={content}
        onChange={changeContent}
        className="text-md h-56 w-full resize-none bg-inherit px-2 outline-none"
      ></textarea>
      <div className="flex flex-row border border-black">
        <h2 className="w-2/3 border border-black p-2 text-xs italic">{time}</h2>
        <button
          onClick={async () => {
            var updatedNote;
            setTime("Saving Changes...");
            if (!id) {
              updatedNote = await trpc.createNote.mutate({
                userId,
                title,
                content,
              });
            } else {
              updatedNote = await trpc.saveNote.mutate({
                id,
                title,
                content,
              });
            }
            setTime(updatedNote.updatedAt.toLocaleString());
          }}
          className="w-1/3 cursor-pointer border border-black"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export function StickyNotes(props: {
  currentNotes: NoteProp[];
  userId: string;
}) {
  const [notes, setNotes] = useState(props.currentNotes);

  const addNewNote = () => {
    setNotes([
      ...notes,
      {
        userId: props.userId,
        title: "Title",
        content: "Description",
      },
    ]);
  };

  const noteLimit = () => {
    if (notes.length < 12) {
      return (
        <button
          onClick={() => {
            addNewNote();
          }}
          className="h-16 border border-black"
        >
          New Note
        </button>
      );
    }
  };

  return (
    <div className="flex w-full flex-row flex-wrap justify-center gap-8">
      {notes.map((note) => (
        <Stickynote {...note} key={note.id} />
      ))}
      {noteLimit()}
    </div>
  );
}
