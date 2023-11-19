"use client"

import { FormInput } from "@/components/form/form-input"
import { Button } from "@/components/ui/button"
import { Board } from "@prisma/client"
import { ElementRef, useRef, useState } from "react"

interface FormBoardTitleProps {
  board: Board
}

export const FormBoardTitle = ({ board }: FormBoardTitleProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<ElementRef<"input">>(null)

  const enbleEditing = () => {
    setIsEditing(true)

    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const disabelEditing = () => setIsEditing(false)

  return (
    <>
      {!isEditing && (
        <Button
          onClick={enbleEditing}
          variant={"transparent"}
          className="font-bold text-xl h-auto w-auto p-1 px-2"
        >
          {board.title}
        </Button>
      )}

      {isEditing && (
        <form action="" className="w-full">
          <FormInput
            ref={inputRef}
            defaultValue={board.title}
            name="title"
            className="bg-transparent focus-visible:ring-transparent focus:!ring-transparent border-none font-bold text-xl h-auto p-1 px-2"
            // onBlur={disabelEditing}
          />
        </form>
      )}
    </>
  )
}
