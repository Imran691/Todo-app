"use client";

import Image from "next/image";
import React, { useState } from "react";
import { NewTodo } from "@/lib/drizzle";
import { useRouter } from "next/navigation";

const AddTodo = () => {
  // type NewTodo being passed as generic here
  const [task, setTask] = useState<NewTodo | null>(null);
  // console.log(task)
  const {refresh} = useRouter();  // to avoid page refresh after click on button

  const handleSubmit = async () => {
    try {
      if (task) {
        const res = await fetch("api/todo", {
          method: "POST",
          body: JSON.stringify({
            task: task.task,
          }),
        });
        console.log(res.ok);
        refresh();
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div>
      <form className="w-full flex gap-x-3">
        <input
          onChange={(e) => setTask({ task: e.target.value })}
          className="rounded-full w-full py-3.5 px-5 border focus:outline-secondary"
          type="text"
        ></input>

        <button
          onClick={handleSubmit}
          // type="button"
          className="p-4 rounded-full shrink-0 bg-gradient-to-b from-primary to-secondary"
        >
          <Image src={"/Vector.png"} alt="Vector" width={20} height={20} />
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
