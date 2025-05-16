"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// 🔁 Type du retour possible : succès ou erreur
export type CommentResponse =
  | { error: string }
  | {
      id: string
      text: string
      author: string
      createdAt: Date
      expiresAt: Date
      timestamp: Date
    }

export async function createComment({
  text,
  author,
}: {
  text: string
  author: string
}): Promise<CommentResponse> {
  try {
    // ✅ Vérifie les champs requis
    if (!text.trim() || !author.trim()) {
      return { error: "Champs manquants." }
    }

    const expiresAt = new Date(Date.now() + 3 * 60 * 60 * 1000) // 3h

    // ✅ Crée le commentaire dans la BDD
    const comment = await prisma.comment.create({
      data: {
        text,
        author,
        expiresAt,
      },
    })

    // ✅ Révalidation de la page (utile si tu affiches les commentaires en SSR)
    revalidatePath("/")

    // ✅ Retourne les données enrichies
    return {
      ...comment,
      timestamp: comment.createdAt, // alias utile pour l'affichage
    }
  } catch (error) {
    console.error("Erreur lors de la création du commentaire :", error)
    return { error: "Erreur lors de la création du commentaire." }
  }
}
