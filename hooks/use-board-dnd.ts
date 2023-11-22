"use client";

import { useState, useEffect } from "react";
import { ListWithCards } from "@/types";
import { useAction } from "@/hooks/use-action";
import { reorderList } from "@/actions/list";
import { reorderCards } from "@/actions/card";
import { toast } from "sonner";

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const useBoardDnd = (lists: ListWithCards[]) => {
  const [orderedData, setOrderedData] = useState(lists);

  const { execute: executeReorderList } = useAction(reorderList, {
    onError: (error) => toast.error(error),
  });

  const { execute: executeReorderCards } = useAction(reorderCards, {
    onError: (error) => toast.error(error),
  });

  useEffect(() => {
    setOrderedData(lists);
  }, [lists]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) return;

    // If dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If user move a list
    if (type === "list") {
      const reorderedList = reorder(
        orderedData,
        source.index,
        destination.index
      );
      const newList = reorderedList.map((item, index) => ({
        ...item,
        order: index,
      }));

      setOrderedData(newList);
      //Trigger Server Actions
      executeReorderList({ items: newList });
    }

    // If user move a card
    if (type === "card") {
      const newOrderList = [...orderedData];

      // Find source and destination list
      const sourceList = newOrderList.find(
        (list) => list.id === source.droppableId
      );
      const destinationList = newOrderList.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destinationList) return;

      // Check if cards exist in the source list
      // Add [] if not
      if (!sourceList.cards) sourceList.cards = [];

      // Check if cards exist in the destination list
      // Add [] if not
      if (!sourceList.cards) sourceList.cards = [];

      // If user move a card in the same list
      if (destination.droppableId === source.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        // Reassign cards order
        reorderedCards.forEach((card, i) => {
          card.order = i;
        });

        sourceList.cards = reorderedCards;

        setOrderedData(newOrderList);

        // Trigger Server Actions
        executeReorderCards({ items: reorderedCards });
      } else {
        // If user move a card to a different list

        // Remove card from source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        // Assign a new listId to the moved card
        movedCard.listId = destination.droppableId;

        // Add card to its destination list
        destinationList.cards.splice(destination.index, 0, movedCard);

        // Reassign cards order in the source list
        sourceList.cards.forEach((card, i) => {
          card.order = i;
        });

        // Reassign cards order in the destination list
        destinationList.cards.forEach((card, i) => {
          card.order = i;
        });

        setOrderedData(newOrderList);

        // Trigger Server Actions
        executeReorderCards({ items: destinationList.cards });
      }
    }
  };

  return { onDragEnd, orderedData, setOrderedData };
};
