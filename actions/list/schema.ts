import { z } from "zod"

// --- Steps to implement a safe action
// --------- Step 1: Create Zod Schema
// --------- Step 2: Create Types
// --------- Step 2: Create The Action

// **********************************************************************
// Create List Schema
// **********************************************************************
export const CreateListSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, "Title is too short"),

  boardId: z.string(),
})

// **********************************************************************
// Update List Title Schema
// **********************************************************************
export const UpdateListTitleSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, "Title is too short"),

  id: z.string(),
})