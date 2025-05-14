"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createComment({ text, author }: { text: string; author: string }) {
  if (!text || !author) return { error: "Champs manquants." }

  const expiresAt = new Date(Date.now() + 3 * 60 * 60 * 1000) // 3h

  const comment = await prisma.comment.create({
    data: {
      text,
      author,
      expiresAt,
    },
  })

  revalidatePath("/") // ou la page concernée
  
  // Adding timestamp to match the interface
  return {
    ...comment,  // Spread all properties from the comment
    timestamp: comment.createdAt,  // Rename `createdAt` to `timestamp`
  }
}

export async function getComments() {
  const comments = await prisma.comment.findMany({
    where: {
      expiresAt: {
        gt: new Date(),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return comments.map((comment) => ({
    ...comment,
    timestamp: comment.createdAt,  // Ensure we return `timestamp` as well
  }))
}
