"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCardModal } from "@/hooks/use-card-modal"
import { CardWithList } from "@/types"
import { fetcher } from "@/lib/fetcher"
import { useQuery } from "@tanstack/react-query"
import { CardModalHeader } from "./card-modal-header"
import { useSearchParams, useRouter } from "next/navigation"

export const CardModal = () => {
  const { id, isOpen, onClose, onOpen } = useCardModal()

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
        onClose()
        router.back()
      }}
    >
      <DialogContent>
        <DialogHeader>
          {card ? (
            <CardModalHeader card={card} />
          ) : (
            <CardModalHeader.Skeleton />
          )}
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
