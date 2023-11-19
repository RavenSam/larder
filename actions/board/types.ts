import { z } from "zod"
import { CreateBoardSchema } from "./schema"
import { ActionState } from "@/lib/create-safe-action"
import { Board } from "@prisma/client"

// **********************************************************************
// Create Board types
export type CreateInputType = z.infer<typeof CreateBoardSchema>
export type CreateReturnType = ActionState<CreateInputType, Board>
