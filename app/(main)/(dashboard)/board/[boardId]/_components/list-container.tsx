"use client"

import { ListWithCards } from "@/types"
import { FormList } from "./form-list"
import { ListItem } from "./list-item"
import { DragDropContext, Droppable } from "@hello-pangea/dnd"
import { useBoardDnd } from "@/hooks/use-board-dnd"

interface ListContainerProps {
  lists: ListWithCards[]
  boardId: string
}

export const ListContainer = ({ lists, boardId }: ListContainerProps) => {
  const { onDragEnd, orderedData, setOrderedData } = useBoardDnd(lists)

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex h-full"
          >
            {orderedData.map((list, index) => (
              <ListItem key={list.id} index={index} list={list} />
            ))}

            {provided.placeholder}

            <FormList />

            <div className="flex-shrink-0 w-4" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}
