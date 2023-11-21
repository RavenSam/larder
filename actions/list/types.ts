import { z } from "zod"
import {
  CreateListSchema,
  DeleteListSchema,
  DuplicateListSchema,
  UpdateListTitleSchema,
} from "./schema"
import { ActionState } from "@/lib/create-safe-action"
import { List } from "@prisma/client"

// --- Steps to implement a safe action
// --------- Step 1: Create Zod Schema
// --------- Step 2: Create Types
// --------- Step 2: Create The Action

// **********************************************************************
// Create List types
// **********************************************************************
export type CreateInputType = z.infer<typeof CreateListSchema>
export type CreateReturnType = ActionState<CreateInputType, List>

// **********************************************************************
// Update List Title types
// **********************************************************************
export type UpdateTitleInputType = z.infer<typeof UpdateListTitleSchema>
export type UpdateTitleReturnType = ActionState<UpdateTitleInputType, List>

// **********************************************************************
// Delete List types
// **********************************************************************
export type DeleteInputType = z.infer<typeof DeleteListSchema>
export type DeleteReturnType = ActionState<DeleteInputType, List>

// **********************************************************************
// Duplicate List types
// **********************************************************************
export type DuplicateInputType = z.infer<typeof DuplicateListSchema>
export type DuplicateReturnType = ActionState<DuplicateInputType, List>
