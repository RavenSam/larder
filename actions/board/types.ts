import { z } from "zod"
import {
  CreateBoardSchema,
  DeleteBoardSchema,
  UpdateBoardSchema,
} from "./schema"
import { ActionState } from "@/lib/create-safe-action"
import { Board } from "@prisma/client"

// --- Steps to follow to implement safe action
// --------- Step 1: Create Zod Schema
// --------- Step 2: Create Types
// --------- Step 2: Create The Action

// **********************************************************************
// Create Board types
// **********************************************************************
export type CreateInputType = z.infer<typeof CreateBoardSchema>
export type CreateReturnType = ActionState<CreateInputType, Board>

// **********************************************************************
// Update Board types
// **********************************************************************
export type UpdateInputType = z.infer<typeof UpdateBoardSchema>
export type UpdateReturnType = ActionState<UpdateInputType, Board>

// **********************************************************************
// Delete Board types
// **********************************************************************
export type DeleteInputType = z.infer<typeof DeleteBoardSchema>
export type DeleteReturnType = ActionState<DeleteInputType, Board>
