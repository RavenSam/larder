import { z } from "zod"
import {
  CreateCardSchema,
  ReorderCardsSchema,
  UpdateCardSchema,
} from "./schema"
import { ActionState } from "@/lib/create-safe-action"
import { Card } from "@prisma/client"

// --- Steps to implement a safe action
// --------- Step 1: Create Zod Schema
// --------- Step 2: Create Types
// --------- Step 2: Create The Action

// **********************************************************************
// Create Card types
// **********************************************************************
export type CreateInputType = z.infer<typeof CreateCardSchema>
export type CreateReturnType = ActionState<CreateInputType, Card>

// **********************************************************************
// Reorder Card types
// **********************************************************************
export type ReorderInputType = z.infer<typeof ReorderCardsSchema>
export type ReorderReturnType = ActionState<ReorderInputType, Card[]>

// **********************************************************************
// Update Card types
// **********************************************************************
export type UpdateInputType = z.infer<typeof UpdateCardSchema>
export type UpdateReturnType = ActionState<UpdateInputType, Card>
