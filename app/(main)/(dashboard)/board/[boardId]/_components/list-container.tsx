"use client"

import { ListWithCards } from "@/types"
import { FormList } from "./form-list"
import { useEffect, useState } from "react"
import { ListItem } from "./list-item"

interface ListContainerProps {
  lists: ListWithCards[]
  boardId: string
}

export const ListContainer = ({ lists, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(lists)

  useEffect(() => {
    setOrderedData(lists)
  }, [lists])

  return (
    <ol className="flex gap-x-3 h-full">
      {orderedData.map((list, index) => (
        <ListItem key={list.id} index={index} list={list} />
      ))}

      <FormList />

      <div className="flex-shrink-0 w-1" />
    </ol>
  )
}
