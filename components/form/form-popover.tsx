"use client"

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button"
import { XIcon } from "lucide-react"
import { FormInput } from "./form-input"
import { FormSubmit } from "./form-submit"
import { useAction } from "@/hooks/use-action"
import { createBoard } from "@/actions/board"
import { toast } from "sonner"
import { FormImagePicker } from "./form-image-picker"
import { ElementRef, useRef } from "react"
import { useRouter } from "next/navigation"

interface FormPopoverProps {
  children: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  align?: "center" | "start" | "end"
  sideOffset?: number
}

export const FormPopover = ({
  children,
  align,
  side = "bottom",
  sideOffset = 0,
}: FormPopoverProps) => {
  const closeRef = useRef<ElementRef<"button">>(null)
  const router = useRouter()

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board created")

      closeRef.current?.click()

      router.push(`/board/${data.id}`)
    },
    onError: (error) => {
      console.log({ error })
      toast.error(error)
    },
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string
    const image = formData.get("image") as string

    execute({ title, image })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>

      <PopoverContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="md:w-[350px]"
      >
        <div className="text-sm font-bold text-center text-neutral-700 pb-4">
          Create board
        </div>

        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto absolute top-2 right-2 p-2 text-neutral-600"
            variant={"ghost"}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormImagePicker name="image" errors={fieldErrors} />

            <FormInput
              name="title"
              label="Title"
              errors={fieldErrors}
              placeholder="Board title here..."
            />
          </div>
          <FormSubmit className="w-full" spinner>
            Create board
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}
