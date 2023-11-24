"use client"

import { useParams, useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { CopyIcon, TrashIcon, Loader2, GitCommitVertical } from "lucide-react"
import { useAction } from "@/hooks/use-action"
import { deleteCard, duplicateCard } from "@/actions/card"
import { toast } from "sonner"
import { useCardModal } from "@/hooks/use-card-modal"

interface Props {
  card: CardWithList
}

export const CardModalActions = ({ card }: Props) => {
  const params = useParams()
  const router = useRouter()
  const { onClose } = useCardModal()

  const { execute: exeDelete, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onError: (error) => toast.error(error),
      onSuccess: (data) => {
        toast.success(`Card ${data.title} deleted`)
        router.back()
        onClose()
      },
    }
  )

  const { execute: exeDuplicate, isLoading: isLoadingDuplicate } = useAction(
    duplicateCard,
    {
      onError: (error) => toast.error(error),
      onSuccess: (data) => {
        toast.success(`Card ${data.title} duplicated`)
        router.push(`?card=` + data.id)
        // onClose()
      },
    }
  )

  const onDuplicate = () => {
    const boardId = params.boardId as string

    exeDuplicate({ id: card.id, boardId })
  }

  const onDelete = () => {
    const boardId = params.boardId as string

    exeDelete({ id: card.id, boardId })
  }

  return (
    <div className="w-full space-y-2">
      <p className="font-semibold flex items-center">
        {/* <GitCommitVertical className="h-6 w-6 mr-2" /> */}
        Actions
      </p>

      <div className="space-y-2">
        <Button
          onClick={onDuplicate}
          variant="secondary"
          disabled={isLoadingDuplicate}
          className="w-full justify-start text-sm bg-muted-foreground/10 border hover:border-foreground"
        >
          {isLoadingDuplicate ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <CopyIcon className="h-4 w-4 mr-2" />
          )}
          Duplicate
        </Button>
        <Button
          onClick={onDelete}
          variant="secondary"
          disabled={isLoadingDelete}
          className="w-full justify-start text-sm bg-muted-foreground/10 border hover:border-rose-500 hover:text-rose-500 hover:bg-rose-500/10"
        >
          {isLoadingDelete ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <TrashIcon className="h-4 w-4 mr-2" />
          )}
          Delete
        </Button>
      </div>
    </div>
  )
}

const SkeletonCardModalActions = () => (
  <div className="w-full space-y-2">
    <Skeleton className="w-20 h-4" />
    <Skeleton className="w-full h-8" />
    <Skeleton className="w-full h-8" />
  </div>
)

CardModalActions.Skeleton = SkeletonCardModalActions
