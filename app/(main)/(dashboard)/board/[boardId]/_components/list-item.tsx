"use client"

import { ListHeader } from "./list-header"
import { ListWrapper } from "./list-wrapper"
import { ListWithCards } from "@/types"
import { useEditing } from "@/hooks/use-editing"
import { FormCard } from "./form-card"
import { Ref } from "react"
import { CardItem } from "./card-item"

interface ListItemProps {
  index: number
  list: ListWithCards
}

export const ListItem = ({ list, index }: ListItemProps) => {
  const elEditing = useEditing({ el: "textarea" })

  return (
    <ListWrapper>
      <div className="w-full rounded-md bg-white/70 backdrop-blur shadow-md pb-2">
        <ListHeader list={list} onAddCard={elEditing.enbleEditing} />

        <ol className="p-2 py-0 flex flex-col gap-y-2">
          {list.cards.map((card, i) => (
            <CardItem card={card} key={card.id} index={i} />
          ))}
        </ol>

        <FormCard
          listId={list.id}
          ref={elEditing.elRef as Ref<HTMLTextAreaElement>}
          isEditing={elEditing.isEditing}
          enbleEditing={elEditing.enbleEditing}
          disableEditing={elEditing.disableEditing}
        />
      </div>
    </ListWrapper>
  )
}
