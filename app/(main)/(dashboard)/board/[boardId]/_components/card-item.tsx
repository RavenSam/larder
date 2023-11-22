"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";

interface CardItemProps {
  card: Card;
  index: number;
}

export const CardItem = ({ card, index }: CardItemProps) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          role="button"
          className="first:mt-1 bg-white/50 backdrop-blur truncate p-3 text-sm rounded-md shadow"
        >
          {card.title}
        </li>
      )}
    </Draggable>
  );
};
