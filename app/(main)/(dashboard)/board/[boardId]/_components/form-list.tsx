"use client"

import { Button } from "@/components/ui/button"
import { ListWrapper } from "./list-wrapper"
import { Plus } from "lucide-react"
import { ElementRef, useRef, useState } from "react"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import { FormInput } from "@/components/form/form-input"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useParams } from "next/navigation"
import { FormSubmit } from "@/components/form/form-submit"
import { useAction } from "@/hooks/use-action"
import { createList } from "@/actions/list"
import { toast } from "sonner"

export const FormList = () => {
  const params = useParams()
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<ElementRef<"input">>(null)
  const formRef = useRef<ElementRef<"form">>(null)
  const [parent] = useAutoAnimate()

  const { execute, isLoading, fieldErrors } = useAction(createList, {
    onSuccess: (data) => setIsEditing(false),
    onError: (error) => toast.error(error),
  })

  const enableEditing = () => {
    setIsEditing(true)

    setTimeout(() => {
      inputRef.current?.focus()
    })
  }

  const disableEditing = () => setIsEditing(false)

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsEditing(false)
    }
  }

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string
    const boardId = formData.get("boardId") as string

    execute({ title, boardId })
  }

  useEventListener("keydown", onKeyDown)
  useOnClickOutside(formRef, disableEditing)

  return (
    <ListWrapper>
      <div
        ref={parent}
        className="overflow-y-hidden bg-white/30 rounded-md shadow-md backdrop-blur"
      >
        {!isEditing && (
          <Button
            onClick={enableEditing}
            className="w-full h-12 text-black bg-transparent hover:bg-white/20"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add a list
          </Button>
        )}

        {isEditing && (
          <form
            action={onSubmit}
            ref={formRef}
            className="w-full p-3 space-y-3 bg-white/40"
          >
            <FormInput
              ref={inputRef}
              name="title"
              className="bg-black/10 border-none"
              placeholder="Title list here..."
              errors={fieldErrors}
            />

            <input type="hidden" name="boardId" value={params.boardId} />

            <FormSubmit className="w-full h-10" spinner>
              <Plus className="h-5 w-5 mr-2" />
              Add a list
            </FormSubmit>
          </form>
        )}
      </div>
    </ListWrapper>
  )
}
