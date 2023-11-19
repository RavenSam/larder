import { FormPopover } from "@/components/form/form-popover"
import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import {
  HelpCircleIcon,
  LayoutDashboardIcon,
  PlusIcon,
  User2Icon,
} from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import React from "react"

export default async function BoardsList() {
  const { orgId } = auth()

  if (!orgId) return redirect("/select-org")

  const boards = await db.board.findMany({
    where: { orgId },
    orderBy: { updatedAt: "desc" },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2Icon className="h-6 w-6 mr-2" />
        Your Boards
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 lg:gap-4">
        <CreateBoardBtn />

        {boards.map((board) => (
          <Link
            key={board.id}
            href={"/board/" + board.id}
            style={{ backgroundImage: `url(${board.imageThumb})` }}
            className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-black/30 w-full h-full rounded-md p-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 drop-shadow-md transition" />

            <span className="relative font-semibold text-white">
              {board.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

const CreateBoardBtn = () => (
  <FormPopover sideOffset={10} side="right">
    <Button
      variant={"ghost"}
      className="relative h-full w-full aspect-video flex-col bg-primary/10 border-2 border-dashed border-muted-foreground/50"
    >
      <LayoutDashboardIcon className="text-muted-foreground/20 h-10 w-10 -mt-4" />

      <span className="flex items-center">
        <PlusIcon className="h-4 w-4 mr-2" />
        Create new board
      </span>

      <span className="text-xs text-muted-foreground">5 remaining</span>

      <Hint
        sideOffset={20}
        descripttion={`Free workspaces can have up to 5 open boards. Upgrade workspace tier for unlimited boards`}
      >
        <HelpCircleIcon className="absolute bottom-2 right-2 h-[14px] w-[14px] opacity-70 hover:opacity-100" />
      </Hint>
    </Button>
  </FormPopover>
)

const SkeletnBoardList = () => (
  <div className="space-y-4">
    <div className="flex items-center font-semibold text-lg text-neutral-700">
      <User2Icon className="h-6 w-6 mr-2" />
      Your Boards
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 lg:gap-4">
      <Skeleton className="w-full h-full aspect-video" />
      <Skeleton className="w-full h-full aspect-video" />
      <Skeleton className="w-full h-full aspect-video" />
      <Skeleton className="w-full h-full aspect-video" />
      <Skeleton className="w-full h-full aspect-video" />
      <Skeleton className="w-full h-full aspect-video" />
      <Skeleton className="w-full h-full aspect-video" />
      <Skeleton className="w-full h-full aspect-video" />
    </div>
  </div>
)

BoardsList.Skeleton = SkeletnBoardList
