"use client";

import { Trash2, ListTodo } from "lucide-react";

type TodoItemProps = {
  id: string;
  title: string;
  complete: boolean;
  toggleTodo: (id: string, complete: boolean) => void;
  deleteTodo: (id: string) => void;
};

export function TodoItem({ id, title, complete, toggleTodo, deleteTodo }: TodoItemProps) {
    const handleDelete = () => {
        deleteTodo(id)
    }
  return (
    <li className="w-full flex items-center justify-between p-4 border rounded-md border-slate-700">
      <div className="flex gap-1  items-center ">
      <ListTodo className="mr-2 text-slate-500 " size={24} />
        <input
          id={id}
          type="checkbox"
          className="cursor-pointer peer"
          defaultChecked={complete}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        <label
          htmlFor={id}
          className="ml-1 cursor-pointer peer-checked:line-through peer-checked:text-slate-500"
        >
          {title}
        </label>
      </div>
      <div className="flex items-center">
      <p className="mr-2 text-xs text-slate-500">{complete ? "completed" : ""}</p>
      <button onClick={handleDelete} className="bg-transparent rounded-md px-2 py-2 outline-none hover:bg-slate-700">
        <Trash2 className="text-slate-300 " size={14} />
      </button>
      </div>
 
    </li>
  );
}
