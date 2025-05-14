'use server'

import { prisma } from '@/lib/prisma'

interface UpdateLiveInput {
  id: string
  title?: string
  description?: string
  startTime?: string
  endTime?: string
}

export const updateLive = async (input: UpdateLiveInput) => {
  const { id, ...data } = input

  try {
    const updatedLive = await prisma.live.update({
      where: { id },
      data, // ✅ on passe directement le reste sans 'status'
    })

    return { success: true, live: updatedLive }
  } catch (error) {
    console.error("Erreur mise à jour live:", error)
    return { success: false, message: "Erreur lors de la mise à jour." }
  }
}
