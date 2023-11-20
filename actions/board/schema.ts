import { z } from "zod"

// --- Steps to follow to implement safe action
// --------- Step 1: Create Zod Schema
// --------- Step 2: Create Types
// --------- Step 2: Create The Action

// **********************************************************************
// Create Board Schema
// **********************************************************************
export const CreateBoardSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, "Title is too short"),

  image: z.string({
    required_error: "Image is required",
    invalid_type_error: "Image is required",
  }),
})

// **********************************************************************
// Update Board Schema
// **********************************************************************
export const UpdateBoardSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, "Title is too short"),

  id: z.string(),
})

// **********************************************************************
// Delete Board Schema
// **********************************************************************
export const DeleteBoardSchema = z.object({
  id: z.string(),
})
