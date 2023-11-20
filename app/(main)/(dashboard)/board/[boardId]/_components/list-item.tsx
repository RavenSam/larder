import { ListHeader } from "./list-header"
import { ListWrapper } from "./list-wrapper"
import { ListWithCards } from "@/types"

interface ListItemProps {
  index: number
  list: ListWithCards
}

export const ListItem = ({ list, index }: ListItemProps) => {
  return (
    <ListWrapper>
      <div className="w-full rounded-md bg-white/70 backdrop-blur shadow-md pb-2">
        <ListHeader list={list} />
      </div>
    </ListWrapper>
  )
}
