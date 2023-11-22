"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { createSafeAction } from "@/lib/create-safe-action";

import {
  CreateInputType,
  CreateReturnType,
  DeleteInputType,
  DeleteReturnType,
  DuplicateInputType,
  DuplicateReturnType,
  UpdateTitleInputType,
  UpdateTitleReturnType,
} from "./types";
import {
  CreateListSchema,
  DeleteListSchema,
  DuplicateListSchema,
  UpdateListTitleSchema,
  ReorderListSchema,
} from "./schema";

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
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, boardId } = data;

  let list;

  try {
    const board = await db.board.findUnique({ where: { id: boardId, orgId } });

    if (!board) {
      return {
        error: "Board not found",
      };
    }

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({ data: { boardId, title, order: newOrder } });
  } catch (error) {
    console.log(error);
    return { error: "Failed to create list" };
  }

  revalidatePath(`/board/${boardId}`);

  return { data: list };
};

export const createList = createSafeAction(CreateListSchema, createdHandler);

// **********************************************************************
// UPDATE LIST TITLE
// **********************************************************************

const updatedTitleHandler = async (
  data: UpdateTitleInputType
): Promise<UpdateTitleReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, id } = data;

  let list;

  try {
    list = await db.list.update({ where: { id }, data: { title } });
  } catch (error) {
    console.log(error);
    return { error: "Failed to update list's title" };
  }

  // revalidatePath(`/board/${board.id}`)

  return { data: list };
};

export const updateListTitle = createSafeAction(
  UpdateListTitleSchema,
  updatedTitleHandler
);

// **********************************************************************
// DELETE LIST
// **********************************************************************

const deleteHandler = async (
  data: DeleteInputType
): Promise<DeleteReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id } = data;

  let list;

  try {
    list = await db.list.delete({ where: { id, board: { orgId } } });
  } catch (error) {
    console.log(error);
    return { error: "Failed to delete list" };
  }

  revalidatePath(`/board/${list.boardId}`);
  return { data: list };
};

export const deleteList = createSafeAction(DeleteListSchema, deleteHandler);

// **********************************************************************
// DUPLICATE LIST
// **********************************************************************

const duplicateHandler = async (
  data: DuplicateInputType
): Promise<DuplicateReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;

  let list;

  try {
    const listToCopy = await db.list.findUnique({
      where: { id, boardId, board: { orgId } },
      include: { cards: true },
    });

    if (!listToCopy) {
      return {
        error: "List nt found",
      };
    }

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({
      data: {
        boardId,
        title: `${listToCopy.title} - Copy`,
        order: newOrder,
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      },
      include: { cards: true },
    });
  } catch (error) {
    console.log(error);
    return { error: "Failed to duplicate list" };
  }

  revalidatePath(`/board/${list.boardId}`);
  return { data: list };
};

export const duplicateList = createSafeAction(
  DuplicateListSchema,
  duplicateHandler
);

// **********************************************************************
// REORDER LIST
// **********************************************************************

const reorderHandler = async (
  data: ReorderInputType
): Promise<ReorderReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { items } = data;

  let lists;

  try {
    const transaction = items.map((list) =>
      db.list.update({
        where: { id: list.id, board: { orgId } },
        data: { order: list.order },
      })
    );

    lists = await db.$transaction(transaction);
  } catch (error) {
    console.log(error);
    return { error: "Failed to reorder list" };
  }

  return { data: lists };
};

export const reorderList = createSafeAction(ReorderListSchema, reorderHandler);
