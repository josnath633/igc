
// app/actions/requestStatusAction.ts
"use server"

import { prisma } from "@/lib/prisma"

// Server Action pour obtenir le statut de la dernière demande
export async function getRequestStatus(email: string) {
  try {
    // Récupère la dernière requête (la plus récente) de l'utilisateur par email
    const latestRequest = await prisma.request.findFirst({
      where: {
        name: email,
      },
      orderBy: {
        createdAt: "desc", // trie par date de création décroissante
      },
    })

    if (!latestRequest) {
      throw new Error("Aucune demande trouvée.")
    }
  console.log(latestRequest.status)
    return latestRequest.status // "APPROVED", "REJECTED", "PENDING"
  } catch (error) {
    console.error("Erreur lors de la récupération du statut :", error)
    throw new Error("Impossible de vérifier le statut de la demande.")
  }
}
