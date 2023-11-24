"use client"

import { ChangeEvent, useEffect, useState } from "react"
import { useDebounce } from "usehooks-ts"
import { Skeleton } from "@/components/ui/skeleton"
import { AlignLeftIcon, Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useAction } from "@/hooks/use-action"
import { updateCard } from "@/actions/card"
import { toast } from "sonner"

interface Props {
  card: CardWithList
}

export const CardModalDescription = ({ card }: Props) => {
  const params = useParams()
  const queryClient = useQueryClient()
  const [value, setValue] = useState<string>(card.description)
  const debouncedValue = useDebounce<string>(value, 500)
  const [saved, setSaved] = useState(false)

  const { execute, isLoading } = useAction(updateCard, {
    onError: (error) => toast.error(error),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["card", data.id] })
      setSaved(true)
      setTimeout(() => {
        setSaved(false)
      }, 2000)
    },
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    if (card.description !== value) {
      execute({
        id: card.id,
        boardId: params.boardId,
        description: value,
      })
    }
  }, [debouncedValue])

  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeftIcon className="h-6 w-6 mt-0.5" />
      <div className="w-full">
        <p className="font-semibold mb-2">Description</p>

        <div className="relative">
          <Textarea
            placeholder="Type your description here."
            className="max-h-[250px] bg-muted-foreground/10 min-h-[150px]"
            value={value}
            onChange={handleChange}
          />

          {isLoading && (
            <div className="absolute top-0 right-0 -translate-y-full opacity-50 p-2 pointer-events-none">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}

          {!isLoading && saved && (
            <div className="absolute top-0 right-0 text-xs -translate-y-full opacity-50 p-2 pointer-events-none">
              saved
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const SkeletonCardModalDescription = () => (
  <div className="flex items-start gap-x-3 w-full mb-6">
    <AlignLeftIcon className="h-6 w-6 mt-1" />
    <div className="w-full">
      <Skeleton className="w-[60%] h-8 mb-2" />
      <Skeleton className="w-full h-[78px]" />
    </div>
  </div>
)

CardModalDescription.Skeleton = SkeletonCardModalDescription
