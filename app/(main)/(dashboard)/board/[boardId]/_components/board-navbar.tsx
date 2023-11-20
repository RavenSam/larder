import { Board } from "@prisma/client"
import { FormBoardTitle } from "./form-board-title"
import BoardOptions from "./board-options"

interface BoardNavbarProps {
  board: Board
}

export const BoardNavbar = ({ board }: BoardNavbarProps) => {
  return (
    <div className="fixed w-full py-2 z-40 bg-black/50 backdrop-blur top-14 flex items-center px-6 gap-x-4 text-white">
      <FormBoardTitle board={board} />

      <div className="ml-auto">
        <BoardOptions id={board.id} />
      </div>
    </div>
  )
}
