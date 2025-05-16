"use server"

import { prisma } from "@/lib/prisma"

export async function createLive({
  title,
  description,
  startTime,
  endTime,
}: {
  title: string
  description?: string | null
  startTime?: Date
  endTime?: Date
}) {
  try {
    if (!title.trim()) {
      throw new Error("Le titre est requis.")
    }

    const newLive = await prisma.live.create({
      data: {
        title,
        description: description ?? "",
        startTime: new Date() ?? "", // ✅ Remplace undefined par null
        endTime: new Date() ?? "",     // ✅ Remplace undefined par null
        dateTime: startTime ?? new Date(), // ✅ Fallback à la date actuelle si non fourni
      },
    })

    return newLive
  } catch (error) {
    console.error("Erreur lors de la création du live:", error)
    throw new Error("Erreur lors de la création du live")
  }
}
