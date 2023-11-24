"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { createAuditLog } from "@/lib/create-audit-log"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { ENTITY_TYPE, ACTION } from "@prisma/client"

import { createSafeAction } from "@/lib/create-safe-action"

import {
  CreateInputType,
  CreateReturnType,
  ReorderInputType,
  ReorderReturnType,
  UpdateInputType,
  UpdateReturnType,
  DuplicateInputType,
  DuplicateReturnType,
  DeleteInputType,
  DeleteReturnType,
} from "./types"
import {
  CreateCardSchema,
  ReorderCardsSchema,
  UpdateCardSchema,
  DuplicateCardSchema,
  DeleteCardSchema,
} from "./schema"

// --- Steps to implement safe action
// --------- Step 1: Create Zod Schema
// --------- Step 2: Create Types
// --------- Step 2: Create The Action

// **********************************************************************
// CREATE CARD
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

    await createAuditLog({
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      entityTitle: card.title,
      action: ACTION.CREATE,
    })
  } catch (error) {
    console.log(error)
    return { error: "Failed to create card" }
  }

  revalidatePath(`/board/${boardId}`)

  return { data: card }
}

export const createCard = createSafeAction(CreateCardSchema, createdHandler)

// **********************************************************************
// REORDER CARDS
// **********************************************************************

const reorderHandler = async (
  data: ReorderInputType
): Promise<ReorderReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    }
  }

  const { items } = data

  let cards

  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: { id: card.id, list: { board: { orgId } } },
        data: { order: card.order, listId: card.listId },
      })
    )

    cards = await db.$transaction(transaction)
  } catch (error) {
    console.log(error)
    return { error: "Failed to reorder cards" }
  }

  return { data: cards }
}

export const reorderCards = createSafeAction(ReorderCardsSchema, reorderHandler)

// **********************************************************************
// UPDATE CARD
// **********************************************************************

const updateHandler = async (
  data: UpdateInputType
): Promise<UpdateReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    }
  }

  const { id, boardId, ...values } = data

  let card

  try {
    card = await db.card.update({
      where: { id, list: { board: { orgId } } },
      data: { ...values },
    })
  } catch (error) {
    console.log(error)
    return { error: "Failed to update card" }
  }

  if (!data.description) {
    revalidatePath(`/board/${boardId}`)
  }

  return { data: card }
}

export const updateCard = createSafeAction(UpdateCardSchema, updateHandler)

// **********************************************************************
// DUPLICATE CARD
// **********************************************************************

const duplicateHandler = async (
  data: DuplicateInputType
): Promise<DuplicateReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    }
  }

  const { id, boardId } = data

  let card

  try {
    const cardToCopy = await db.card.findUnique({
      where: { id, list: { board: { orgId } } },
    })

    if (!cardToCopy) {
      return {
        error: "card nt found",
      }
    }

    const lastCard = await db.card.findFirst({
      where: { listId: cardToCopy.listId },
      orderBy: { order: "desc" },
      select: { order: true },
    })

    const newOrder = lastCard ? lastCard.order + 1 : 1

    card = await db.card.create({
      data: {
        title: `${cardToCopy.title} - Copy`,
        description: cardToCopy.description,
        order: newOrder,
        listId: cardToCopy.listId,
      },
    })
  } catch (error) {
    console.log(error)
    return { error: "Failed to duplicate card" }
  }

  revalidatePath(`/board/${boardId}`)

  return { data: card }
}

export const duplicateCard = createSafeAction(
  DuplicateCardSchema,
  duplicateHandler
)

// **********************************************************************
// DELETE CARD
// **********************************************************************

const deleteHandler = async (
  data: DeleteInputType
): Promise<DeleteReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    }
  }

  const { id, boardId } = data

  let card

  try {
    card = await db.card.delete({
      where: { id, list: { board: { orgId } } },
    })
  } catch (error) {
    console.log(error)
    return { error: "Failed to delete card" }
  }

  revalidatePath(`/board/${boardId}`)

  return { data: card }
}

export const deleteCard = createSafeAction(DeleteCardSchema, deleteHandler)
