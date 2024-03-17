"use client";
import { SetStateAction, useState } from "react";
import { trpc } from "../api/trpc/[trpc]/trpcClient";

export type NoteProp = {
  id: string;
  userId: string;
  title: string;
  content: string;
  updatedAt?: Date;
};

function StickyNote(props: {
  note: NoteProp;
  removeNote: (props: { noteId: string; newNote: boolean }) => Promise<void>;
}) {
  const [title, setTitle] = useState(props.note.title);
  const [content, setContent] = useState(props.note.content);
  const [time, setTime] = useState(
    props.note.updatedAt?.toLocaleString() || "Unsaved",
  );
  var newNote = false;
  const id = props.note.id;
  if (Number(id)) {
    newNote = true;
  }
  const userId = props.note.userId;
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
    <div className="flex h-72 w-72 flex-col rounded-sm border-2 border-black bg-yellow-200 shadow-xl">
      <div className="flex flex-row bg-yellow-300">
        <textarea
          maxLength={42}
          placeholder="Title"
          value={title}
          onChange={changeTitle}
          className="h-10 w-full resize-none bg-inherit px-2 pt-1.5 text-xl outline-none placeholder:italic placeholder:text-slate-600"
        ></textarea>
        <div className="group flex flex-col justify-center">
          <button
            onClick={async () => {
              props.removeNote({ noteId: id, newNote });
            }}
            className="invisible pr-3 text-xl font-bold group-hover:visible"
          >
            X
          </button>
        </div>
      </div>
      <textarea
        maxLength={512}
        placeholder="Content"
        value={content}
        onChange={changeContent}
        className="text-md h-56 w-full resize-none bg-inherit px-2 outline-none placeholder:italic placeholder:text-slate-600"
      ></textarea>
      <div className="flex flex-row border-t-2 border-black">
        <h2 className="w-2/3 border-r-2 border-black p-2 text-xs italic">
          {time}
        </h2>
        <button
          onClick={async () => {
            var updatedNote;
            setTime("Saving Changes...");
            if (newNote) {
              updatedNote = await trpc.createNote.mutate({
                userId,
                title,
                content,
              });
              newNote = false;
            } else {
              updatedNote = await trpc.saveNote.mutate({
                id,
                title,
                content,
              });
            }
            setTime(updatedNote.updatedAt.toLocaleString());
          }}
          className="w-1/3"
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
  const [newNoteCounter, setNewNoteCounter] = useState(1);

  const addNewNote = () => {
    setNotes([
      ...notes,
      {
        id: newNoteCounter.toString(),
        userId: props.userId,
        title: "",
        content: "",
      },
    ]);
    setNewNoteCounter(() => newNoteCounter + 1);
  };

  const deleteNote = async (props: { noteId: string; newNote: boolean }) => {
    var deletedNote;
    if (!props.newNote) {
      deletedNote = await trpc.deleteNote.mutate({ id: props.noteId });
    }
    if (deletedNote || props.newNote) {
      setNotes([
        ...notes.filter((note) => {
          if (note.id != props.noteId) return note;
        }),
      ]);
    }
  };

  const noteLimit = () => {
    if (notes.length < 12) {
      return (
        <div className="flex w-72 flex-col justify-center">
          <button
            onClick={() => {
              addNewNote();
            }}
            className="ml-8 h-auto text-6xl text-black dark:text-white"
          >
            +
          </button>
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-[288px] w-full flex-row flex-wrap justify-center gap-8 px-4">
      {notes.map((note) => (
        <StickyNote note={note} removeNote={deleteNote} key={note.id} />
      ))}
      {noteLimit()}
    </div>
  );
}
