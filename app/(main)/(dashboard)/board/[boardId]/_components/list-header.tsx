import { updateListTitle } from "@/actions/list"
import { FormInput } from "@/components/form/form-input"
import { useAction } from "@/hooks/use-action"
import { ListWithCards } from "@/types"
import { ElementRef, useRef, useState } from "react"
import { toast } from "sonner"
import { useEventListener } from "usehooks-ts"
import ListOptions from "./list-options"

interface ListHeaderProps {
  list: ListWithCards
  onAddCard: () => void
}

export const ListHeader = ({ list, onAddCard }: ListHeaderProps) => {
  const [title, setTitle] = useState(list.title)
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<ElementRef<"input">>(null)
  const formRef = useRef<ElementRef<"form">>(null)

  const { execute } = useAction(updateListTitle, {
    onSuccess(data) {
      setTitle(data.title)
      setIsEditing(false)
    },
    onError(error) {
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

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string
    const id = formData.get("id") as string

    execute({ title, id })
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsEditing(false)
    }
  }

  useEventListener("keydown", onKeyDown)

  return (
    <div className="p-2 pb-0 text-sm font-semibold flex items-center justify-between">
      <div className="">
        {!isEditing && (
          <div onClick={enbleEditing} className="w-full px-2 py-1">
            {title}
          </div>
        )}

        {isEditing && (
          <form action={onSubmit} ref={formRef} className="w-full md:max-w-md">
            <FormInput
              ref={inputRef}
              defaultValue={title}
              name="title"
              className="bg-black/10 border-none h-auto py-1 px-2 "
              onBlur={onBlur}
              placeholder="Enter list title..."
            />

            <input type="hidden" name="id" value={list.id} />
          </form>
        )}
      </div>

      <ListOptions list={list} onAddCard={onAddCard} />
    </div>
  )
}
