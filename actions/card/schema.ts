import { z } from "zod"

// --- Steps to implement a safe action
// --------- Step 1: Create Zod Schema
// --------- Step 2: Create Types
// --------- Step 2: Create The Action

// **********************************************************************
// Create Card Schema
// **********************************************************************
export const CreateCardSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, "Title is too short"),

  boardId: z.string(),
  listId: z.string(),
})

// **********************************************************************
// Reorder Cards Schema
// **********************************************************************
export const ReorderCardsSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      listId: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
})

// **********************************************************************
// Update Card Schema
// **********************************************************************
export const UpdateCardSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, "Title is too short"),

  description: z.optional(
    z
      .string({
        required_error: "Description is required",
        invalid_type_error: "Description is required",
      })
      .min(3, "Description is too short")
  ),

  boardId: z.string(),

  id: z.string(),
})
