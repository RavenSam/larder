"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { createSafeAction } from "@/lib/create-safe-action"

import { CreateInputType, CreateReturnType } from "./types"
import { CreateCardSchema } from "./schema"

// --- Steps to implement safe action
// --------- Step 1: Create Zod Schema
// --------- Step 2: Create Types
// --------- Step 2: Create The Action

// **********************************************************************
// CREATE LIST
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

  const { title, listId, boardId } = data

  let card

  try {
    const list = await db.list.findUnique({
      where: { id: listId, board: { orgId } },
    })

    if (!list) {
      return {
        error: "List not found",
      }
    }

    const lastCard = await db.card.findFirst({
      where: { listId },
      orderBy: { order: "desc" },
      select: { order: true },
    })

    const newOrder = lastCard ? lastCard.order + 1 : 1

    card = await db.card.create({
      data: { title, description: "", listId, order: newOrder },
    })
  } catch (error) {
    console.log(error)
    return { error: "Failed to create list" }
  }

  revalidatePath(`/board/${boardId}`)

  return { data: card }
}

export const createCard = createSafeAction(CreateCardSchema, createdHandler)
