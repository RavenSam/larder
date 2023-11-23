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

export const CardModal = () => {
  const { id, isOpen, onClose } = useCardModal()

  const { data: card } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/card/${id}`),
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
