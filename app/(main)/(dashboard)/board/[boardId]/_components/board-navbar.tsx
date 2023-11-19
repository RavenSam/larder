import { Board } from "@prisma/client"
import { FormBoardTitle } from "./form-board-title"

interface BoardNavbarProps {
  board: Board
}

export const BoardNavbar = ({ board }: BoardNavbarProps) => {
  return (
    <div className="fixed w-full h-14 z-40 bg-black/50 backdrop-blur top-14 flex items-center px-6 gap-x-4 text-white">
      <FormBoardTitle board={board} />
    </div>
  )
}
