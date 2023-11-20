"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { createSafeAction } from "@/lib/create-safe-action"

import {
  CreateInputType,
  CreateReturnType,
  DeleteInputType,
  DeleteReturnType,
  UpdateInputType,
  UpdateReturnType,
} from "./types"
import {
  CreateBoardSchema,
  DeleteBoardSchema,
  UpdateBoardSchema,
} from "./schema"

// --- Steps to follow to implement safe action
// --------- Step 1: Create Zod Schema
// --------- Step 2: Create Types
// --------- Step 2: Create The Action

// **********************************************************************
// CREATE BOARD
// **********************************************************************

const createdHandler = async (
  data: CreateInputType
): Promise<CreateReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    }
  }

  const { title, image } = data

  const [imageId, imageThumb, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split("|")

  if (
    !imageId ||
    !imageThumb ||
    !imageFullUrl ||
    !imageLinkHTML ||
    !imageUserName
  ) {
    return {
      error: "Missing image fields. Failed to create board.",
    }
  }

  let board

  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumb,
        imageFullUrl,
        imageLinkHTML,
        imageUserName,
      },
    })
  } catch (error) {
    console.log(error)
    return { error: "Failed to create board" }
  }

  redirect(`/board/${board.id}`)
}

export const createBoard = createSafeAction(CreateBoardSchema, createdHandler)

// **********************************************************************
// UPDATE BOARD
// **********************************************************************

const updatedHandler = async (
  data: UpdateInputType
): Promise<UpdateReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    }
  }

  const { title, id } = data

  let board

  try {
    board = await db.board.update({ where: { id, orgId }, data: { title } })
  } catch (error) {
    console.log(error)
    return { error: "Failed to update board" }
  }

  // revalidatePath(`/board/${board.id}`)

  return { data: board }
}

export const updateBoard = createSafeAction(UpdateBoardSchema, updatedHandler)

// **********************************************************************
// DELETE BOARD
// **********************************************************************

const deleteHandler = async (
  data: DeleteInputType
): Promise<DeleteReturnType> => {
  const { userId, orgId, orgSlug } = auth()

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    }
  }

  const { id } = data

  try {
    await db.board.delete({ where: { id, orgId } })
  } catch (error) {
    console.log(error)
    return { error: "Failed to delete board" }
  }

  // revalidatePath(`/organization/${orgId}`)
  redirect(`/organization/${orgSlug}`)
}

export const deleteBoard = createSafeAction(DeleteBoardSchema, deleteHandler)
