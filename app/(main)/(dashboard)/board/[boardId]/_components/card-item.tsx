"use client"

import { Card } from "@prisma/client"
import { Draggable } from "@hello-pangea/dnd"
import { useCardModal } from "@/hooks/use-card-modal"
import { useRouter } from "next/navigation"

interface CardItemProps {
  card: Card
  index: number
}

export const CardItem = ({ card, index }: CardItemProps) => {
  const { onOpen } = useCardModal()
  const router = useRouter()

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => {
            onOpen(card.id)
            router.push("?card=" + card.id)
          }}
          role="button"
          className="bg-white/50 backdrop-blur truncate p-3 mt-2 text-sm rounded-md shadow"
        >
          {card.title}
        </li>
      )}
    </Draggable>
  )
}
