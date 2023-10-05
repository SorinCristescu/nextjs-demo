import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import Link from "next/link"

async function createTodo(data: FormData) {
  "use server"

  const title = data.get("title")?.valueOf()
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title")
  }

  await prisma.todo.create({ data: { title, complete: false } })
  redirect("/")
}

export default function NewTodoPage() {
    return (
      <>
        <header className="flex justify-between items-center my-7">
          <h1 className="text-2xl">New Todo</h1>
        </header>
        <form action={createTodo} className="flex gap-2 flex-col">
          <input
            type="text"
            name="title"
            required
            className="border border-slate-500 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
          />
          <div className="flex gap-2 justify-end mt-1">
            <Link
              href=".."
              className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
            >
              Create
            </button>
          </div>
        </form>
      </>
    )
  }
