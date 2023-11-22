"use client";

import { useEffect, useState } from "react";
import { ListWithCards } from "@/types";
import { onDragEnd } from "@/utils/dnd-board";
import { FormList } from "./form-list";
import { ListItem } from "./list-item";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

interface ListContainerProps {
  lists: ListWithCards[];
  boardId: string;
}

export const ListContainer = ({ lists, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(lists);

  useEffect(() => {
    setOrderedData(lists);
  }, [lists]);

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, orderedData, setOrderedData)}
    >
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => (
              <ListItem key={list.id} index={index} list={list} />
            ))}

            {provided.placeholder}

            <FormList />

            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
