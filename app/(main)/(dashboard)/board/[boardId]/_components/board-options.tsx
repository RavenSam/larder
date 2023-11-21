"use client"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover"
import { Loader2, MoreHorizontalIcon, Trash, XIcon } from "lucide-react"
import { useAction } from "@/hooks/use-action"
import { deleteBoard } from "@/actions/board"
import { toast } from "sonner"

export default function BoardOptions({ id }: { id: string }) {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error)
    },
  })

  const onDelete = () => {
    execute({ id })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"icon"} variant={"transparent"} className="">
          <MoreHorizontalIcon className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-1 py-3 bg-white/80 backdrop-blur"
        side="bottom"
        align="end"
      >
        <div className="text-sm font-bold text-center text-neutral-700 pb-4">
          Board action
        </div>

        <PopoverClose asChild>
          <Button
            className="h-auto w-auto absolute top-2 right-2 p-2 text-neutral-600"
            variant={"ghost"}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <div className="">
          <Button
            onClick={onDelete}
            variant={"danger"}
            className="w-full justify-start"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Trash className="h-4 w-4 mr-2" />
            )}
            {isLoading ? "Deleting..." : "Delete board"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
