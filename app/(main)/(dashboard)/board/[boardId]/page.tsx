import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { ListContainer } from "./_components/list-container"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface Props {
  params: { boardId: string }
}

export default async function BoardIdPage({ params }: Props) {
  const { orgId } = auth()

  if (!orgId) redirect("/select-org")

  const lists = await db.list.findMany({
    where: { boardId: params.boardId, board: { orgId } },
    include: { cards: { orderBy: { order: "asc" } } },
    orderBy: { order: "asc" },
  })

  return (
    <ScrollArea className="h-full w-full">
      <div className="p-4 w-full h-full">
        <ListContainer lists={lists} boardId={params.boardId} />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
