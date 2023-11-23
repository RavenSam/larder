"use client"

import { ElementRef, useRef, useState } from "react"
import { CardWithList } from "@/types"
import { Layout } from "lucide-react"
import { FormInput } from "@/components/form/form-input"
import { Skeleton } from "@/components/ui/skeleton"
import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useAction } from "@/hooks/use-action"
import { updateCard } from "@/actions/card"
import { toast } from "sonner"

interface Props {
  card: CardWithList
}

export const CardModalHeader = ({ card }: Props) => {
  const params = useParams()
  const queryClient = useQueryClient()
  const [title, setTitle] = useState(card?.title)
  const inputRef = useRef<ElementRef<"input">>(null)
  const formRef = useRef<ElementRef<"form">>(null)

  const { execute } = useAction(updateCard, {
    onError: (error) => toast.error(error),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["card", data.id] })
      setTitle(data.title)
    },
  })

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string

    if (title === card.title) return

    execute({ id: card.id, title, boardId: params.boardId })
  }

  return (
    <div className="flex items-start gap-x-3 w-full mb-6">
      <Layout className="h-6 w-6 mt-1" />
      <div className="w-full">
        <form action={onSubmit} ref={formRef} className="w-full">
          <FormInput
            ref={inputRef}
            defaultValue={title}
            onBlur={onBlur}
            name="title"
            className="bg-transparent border-none font-bold text-xl h-auto px-1 py-0 mb-2 truncate w-[95%]"
          />
        </form>

        <p className="text-muted-foreground text-xs">
          <span className="border font-semibold rounded-full py-0.5 px-2 border-sky-500 text-sky-500">
            {card?.list.title}
          </span>
        </p>
      </div>
    </div>
  )
}

const SkeletonCardModalHeader = () => (
  <div className="flex items-start gap-x-3 w-full mb-6">
    <Layout className="h-6 w-6 mt-1" />
    <div className="w-full">
      <Skeleton className="w-[60%] h-8 mb-1" />
      <Skeleton className="w-12 h-4" />
    </div>
  </div>
)

CardModalHeader.Skeleton = SkeletonCardModalHeader
