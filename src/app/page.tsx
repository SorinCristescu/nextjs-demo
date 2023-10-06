import Link from "next/link";
import { TodoItem } from "@/components/TodoItem";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { ListTodo } from "lucide-react";

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server";

  await prisma.todo.update({ where: { id }, data: { complete } });

  revalidatePath("/");
}

async function deleteTodo(id: string) {
  "use server";

  await prisma.todo.delete({ where: { id } });

  revalidatePath("/");
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <>
      <header className="flex justify-between items-center my-7">
        <div className="flex items-center">
          <ListTodo className="mr-2" size={30} />
          <h1 className="text-2xl">Todos</h1>
        </div>
        <Link
          href="/new"
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        >
          + New
        </Link>
      </header>
      <ul className="space-y-4">
        {todos.length ? (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              {...todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          ))
        ) : (
          <div className="mt-20 flex flex-col items-center justify-center">
            <p className="text-slate-500 text-md align-center">
              Your todos list is empty.
            </p>
            <p className="text-slate-500 text-md align-center">
              Please add a todo!
            </p>
          </div>
        )}
      </ul>
    </>
  );
}
