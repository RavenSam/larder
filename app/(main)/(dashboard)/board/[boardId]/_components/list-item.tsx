"use client";

import { ListHeader } from "./list-header";
import { ListWithCards } from "@/types";
import { useEditing } from "@/hooks/use-editing";
import { FormCard } from "./form-card";
import { Ref } from "react";
import { CardItem } from "./card-item";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ListItemProps {
  index: number;
  list: ListWithCards;
}

export const ListItem = ({ list, index }: ListItemProps) => {
  const elEditing = useEditing({ el: "textarea" });

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 h-full w-[272px] mx-2 relative select-none"
        >
          <div className="absolute inset-0 bg-white/70 backdrop-blur rounded-md z-[0]" />

          <div
            {...provided.dragHandleProps}
            className="w-full rounded-md relative shadow-md pb-2"
          >
            <ListHeader list={list} onAddCard={elEditing.enbleEditing} />

            <ScrollArea>
              <div className="h-full relative max-h-[50vh]">
                <Droppable droppableId={list.id} type="card">
                  {(provided) => (
                    <ol
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="p-2 py-0 flex flex-col min-h-[5px]"
                    >
                      {list.cards.map((card, i) => (
                        <CardItem card={card} key={card.id} index={i} />
                      ))}

                      {provided.placeholder}
                    </ol>
                  )}
                </Droppable>
              </div>
            </ScrollArea>

            <FormCard
              listId={list.id}
              ref={elEditing.elRef as Ref<HTMLTextAreaElement>}
              isEditing={elEditing.isEditing}
              enbleEditing={elEditing.enbleEditing}
              disableEditing={elEditing.disableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};
