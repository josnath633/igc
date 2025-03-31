"use server";

import  {prisma}  from "@/lib/prisma";  // Assurez-vous que Prisma est correctement configuré
import { auth } from "@/auth"; // Votre méthode d'authentification

// Action serveur pour mettre à jour le statut d'une demande
export async function updateRequestStatusAction(
  requestId: string,
  status: "APPROVED" | "REJECTED"
) {
  try {
    // Valider que l'ID de la demande et le statut sont valides
    if (!requestId || !status) {
      throw new Error("Request ID and status are required");
    }

    if (!["APPROVED", "REJECTED"].includes(status)) {
      throw new Error("Invalid status");
    }

    // Vérifier la session de l'utilisateur
    const session = await auth();
    if (!session) {
      throw new Error("Unauthorized");
    }

    // Mettre à jour la demande dans la base de données
    const updatedRequest = await prisma.request.update({
      where: { id: requestId },
      data: { status },
    });

    return updatedRequest; // Retourne la demande mise à jour
  } catch (error) {
    console.error("Error updating request status:", error);
    throw new Error("Failed to update request status");
  }
}
