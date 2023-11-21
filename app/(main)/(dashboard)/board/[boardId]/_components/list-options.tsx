"use client"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover"
import {
  CopyIcon,
  Loader2,
  MoreHorizontalIcon,
  Plus,
  Trash,
  XIcon,
} from "lucide-react"
import { useAction } from "@/hooks/use-action"
import { toast } from "sonner"
import { ListWithCards } from "@/types"
import { deleteList, duplicateList } from "@/actions/list"
import { Separator } from "@/components/ui/separator"
import { FormSubmit } from "@/components/form/form-submit"
import { ElementRef, useRef } from "react"

interface ListOptionsProps {
  list: ListWithCards
  onAddCard: () => void
}

export default function ListOptions({ list, onAddCard }: ListOptionsProps) {
  const closeRef = useRef<ElementRef<"button">>(null)

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => closeRef.current?.click(),
    onError: (error) => toast.error(error),
  })

  const { execute: executeDuplicate } = useAction(duplicateList, {
    onSuccess: (data) => closeRef.current?.click(),
    onError: (error) => toast.error(error),
  })

  const onDuplicate = (formData: FormData) => {
    const id = formData.get("id") as string
    const boardId = formData.get("boardId") as string

    executeDuplicate({ id, boardId })
  }

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string

    executeDelete({ id })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"icon"} variant={"transparent"} className="text-black">
          <MoreHorizontalIcon className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-1 py-3 bg-white/80 backdrop-blur"
        side="bottom"
        align="center"
      >
        <div className="text-sm font-bold text-center text-neutral-700 pb-4">
          List action
        </div>

        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto absolute top-2 right-2 p-2 text-neutral-600"
            variant={"ghost"}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <div className="">
          <Button
            onClick={onAddCard}
            variant={"ghost"}
            className="w-full justify-start hover:bg-black/5"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add card
          </Button>

          <form action={onDuplicate}>
            <input type="hidden" name="id" value={list.id} />
            <input type="hidden" name="boardId" value={list.boardId} />
            <FormSubmit
              variant={"ghost"}
              className="w-full justify-start hover:bg-black/5"
              spinner
            >
              <CopyIcon className="h-4 w-4 mr-2" />
              Duplicate list
            </FormSubmit>
          </form>

          <Separator className="my-2" />

          <form action={onDelete}>
            <input type="hidden" name="id" value={list.id} />
            <FormSubmit
              variant={"danger"}
              className="w-full justify-start"
              spinner
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete list
            </FormSubmit>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  )
}
