"use client"

import { ElementRef, KeyboardEvent, useRef, useState } from "react"
import { Board } from "@prisma/client"
import { toast } from "sonner"
import { updateBoard } from "@/actions/board"
import { FormInput } from "@/components/form/form-input"
import { Button } from "@/components/ui/button"
import { useAction } from "@/hooks/use-action"

interface FormBoardTitleProps {
  board: Board
}

export const FormBoardTitle = ({ board }: FormBoardTitleProps) => {
  const [title, setTitle] = useState(board.title)
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<ElementRef<"input">>(null)
  const formRef = useRef<ElementRef<"form">>(null)

  const { execute, fieldErrors } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board renamed "${data.title}"`)
      setTitle(data.title)

      setIsEditing(false)
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const enbleEditing = () => {
    setIsEditing(true)

    setTimeout(() => {
      inputRef.current?.focus()
    })
  }

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Escape") {
      setIsEditing(false)
    }
  }

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string

    execute({ title, id: board.id })
  }

  return (
    <>
      {!isEditing && (
        <Button
          onClick={enbleEditing}
          variant={"transparent"}
          className="font-bold text-xl h-auto w-auto p-1 px-2"
        >
          {title}
        </Button>
      )}

      {isEditing && (
        <form
          onKeyDown={onKeyDown}
          action={onSubmit}
          ref={formRef}
          className="w-full md:max-w-md"
        >
          <FormInput
            ref={inputRef}
            defaultValue={title}
            name="title"
            className="bg-transparent focus-visible:ring-transparent focus-visible:ring-offset-0 border-none font-bold text-xl h-auto p-1 px-2"
            onBlur={onBlur}
            errors={fieldErrors}
          />
        </form>
      )}
    </>
  )
}
