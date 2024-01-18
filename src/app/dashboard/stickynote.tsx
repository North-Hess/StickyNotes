"use client";
import { SetStateAction, useState } from "react";

export function Stickynote() {
  const [title, setTitle] = useState("Title");
  const [content, setContent] = useState("Example content");
  const [time, setTime] = useState("dummy time");

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
    <div className="border-2 border-black rounded-sm bg-yellow-200 shadow-xl flex flex-col w-1/4">
      <form>
        <textarea
          maxLength={42}
          value={title}
          onChange={changeTitle}
          className="bg-yellow-300 w-full text-xl h-10 px-2 pt-1.5 resize-none outline-none"
        ></textarea>
        <textarea
          maxLength={512}
          value={content}
          onChange={changeContent}
          className="bg-inherit text-md h-56 px-2 w-full resize-none outline-none"
        ></textarea>
        <h2 className="text-xs italic px-2">Date of sticky note</h2>
      </form>
    </div>
  );
}
