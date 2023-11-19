"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"

import { CreateInputType, CreateReturnType } from "./types"
import { createSafeAction } from "@/lib/create-safe-action"
import { CreateBoardSchema } from "./schema"

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

  revalidatePath(`/boards/${board.id}`)

  return { data: board }
}

export const createBoard = createSafeAction(CreateBoardSchema, createdHandler)

// **********************************************************************
// DELETEE BOARD
// **********************************************************************
