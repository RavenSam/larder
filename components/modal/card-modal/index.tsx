"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCardModal } from "@/hooks/use-card-modal"
import { useSearchParams, useRouter } from "next/navigation"
import { CardWithList } from "@/types"
import { fetcher } from "@/lib/fetcher"
import { useQuery } from "@tanstack/react-query"
import { CardModalHeader } from "./card-modal-header"
import { CardModalDescription } from "./card-modal-description"
import { CardModalActions } from "./card-modal-actions"

export const CardModal = () => {
  const { id, isOpen, onClose } = useCardModal()

  const router = useRouter()
  const searchParams = useSearchParams()

  const cardId = searchParams.get("card")

  const { data: card } = useQuery<CardWithList>({
    queryKey: ["card", cardId || id],
    queryFn: () => fetcher(`/api/card/${cardId || id}`),
  })

  return (
    <Dialog
      open={!!cardId || isOpen}
      onOpenChange={() => {
        router.back()
        onClose()
      }}
    >
      <DialogContent className="max-w-[650px] bg-card/90 backdrop-blur">
        {card ? <CardModalHeader card={card} /> : <CardModalHeader.Skeleton />}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <div className="w-full space-y-6">
              {card ? (
                <CardModalDescription card={card} />
              ) : (
                <CardModalDescription.Skeleton />
              )}
            </div>
          </div>

          <div className="md:col-span-1">
            {card ? (
              <CardModalActions card={card} />
            ) : (
              <CardModalActions.Skeleton />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
