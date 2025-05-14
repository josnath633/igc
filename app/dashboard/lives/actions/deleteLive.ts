'use server'

import { prisma } from '@/lib/prisma'

export const deleteLive = async (id: string) => {
  try {
    await prisma.live.delete({
      where: { id },
    })
    return { success: true }
  } catch (error) {
    console.error("Erreur suppression live:", error)
    return { success: false, message: "Erreur lors de la suppression." }
  }
}
