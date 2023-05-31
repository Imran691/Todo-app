import { Todo } from "@/lib/drizzle";
import React from "react";

const getData = async () => {
  try {
    const res = await fetch("http:/127.0.0.1:3000/api/todo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await res.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};
const TodoList = async () => {
  const res: { data: Todo[] } = await getData();
  // console.log(res)
  return (
    <div className="max-h-[350px] overflow-auto mb-4">
      {res.data.map((item) => (
        <div className="bg-gray-200 py-2 px-3 rounded-lg flex items-center gap-x-4 my-5">
          {/* circle */}
          <div className="h-3 w-3 bg-primary rounded-full"></div>

          {/* Task Title */}
          <p className="text-lg font-medium">{item.task}</p>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
