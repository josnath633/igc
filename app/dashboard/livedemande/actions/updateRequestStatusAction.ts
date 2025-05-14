"use server";

import { prisma } from "@/lib/prisma";

// Action serveur pour mettre à jour le statut d'une demande
export async function updateRequestStatusAction(
  requestId: string,
  status: "APPROVED" | "REJECTED"
) {
  try {
    // Vérifications de base
    if (!requestId || !status) {
      throw new Error("Request ID and status are required");
    }

    if (!["APPROVED", "REJECTED"].includes(status)) {
      throw new Error("Invalid status");
    }

    // Mise à jour dans la base de données
    const updatedRequest = await prisma.request.update({
      where: { id: requestId }, // ici on garde le string si ton modèle est String
      data: { status },
    });

    return updatedRequest;
  } catch (error) {
    console.error("Error updating request status:", error);
    throw new Error("Failed to update request status");
  }
}
