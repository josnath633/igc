// app/actions/requestStatusAction.ts
"use server";

import  {prisma}  from "@/lib/prisma"; // Assurez-vous que Prisma est configuré

// Server Action pour obtenir le statut de la demande
export async function getRequestStatus(userName: string) {
  try {
    // Vérifier le statut de la demande en fonction du nom de l'utilisateur
    const userRequest = await prisma.request.findFirst({
      where: {
        name: userName,
      },
    });

    if (!userRequest) {
      throw new Error("Request not found");
    }

    return userRequest.status; // Renvoie uniquement le statut de la demande
  } catch (error) {
    console.error("Error fetching request status:", error);
    throw new Error("An error occurred while checking the request status.");
  }
}
