"use client"

import { Card } from "@prisma/client"

interface CardItemProps {
  card: Card
  index: number
}

export const CardItem = ({ card }: CardItemProps) => {
  return (
    <li
      role="button"
      className="first:mt-2 bg-white/50 truncate p-3 text-sm rounded-md shadow"
    >
      {card.title}
    </li>
  )
}
