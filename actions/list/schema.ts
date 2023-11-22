import { z } from "zod";

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
});

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
});

// **********************************************************************
// Delete List Schema
// **********************************************************************
export const DeleteListSchema = z.object({ id: z.string() });

// **********************************************************************
// Duplicate List Schema
// **********************************************************************
export const DuplicateListSchema = z.object({
  id: z.string(),
  boardId: z.string(),
});

// **********************************************************************
// Reorder List Schema
// **********************************************************************
export const ReorderListSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
});
