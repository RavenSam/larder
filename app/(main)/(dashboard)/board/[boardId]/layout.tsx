import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { notFound, redirect } from "next/navigation"
import { BoardNavbar } from "./_components/board-navbar"

type ParamsType = { boardId: string }

interface Props {
  children: React.ReactNode
  params: ParamsType
}

export async function generateMetadata({ params }: { params: ParamsType }) {
  const { orgId } = auth()

  if (!orgId) return { title: "Board" }

  const board = await db.board.findUnique({
    where: { id: params.boardId, orgId },
  })

  return {
    title: board?.title || "Board",
  }
}

export default async function BoardLayout({ children, params }: Props) {
  const { orgId } = auth()

  if (!orgId) return redirect("/select-org")

  const board = await db.board.findUnique({
    where: { id: params.boardId, orgId },
  })

  if (!board) notFound()

  return (
    <div
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
      className="relative bg-no-repeat bg-center bg-cover w-full h-full"
    >
      <div className="absolute inset-0 bg-black/20" />

      <BoardNavbar board={board} />

      <main className="relative pt-28 h-full">{children}</main>
    </div>
  )
}
