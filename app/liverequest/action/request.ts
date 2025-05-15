// /app/api/request/RequestFormAction.ts (par exemple)
'use server';

import { prisma } from "@/lib/prisma";

export async function RequestFormAction({
  email,
  liveSessionId,
}: {
  email: string;
  liveSessionId: string;
}) {
  if (!email || !liveSessionId) {
    return { success: false, message: "Email ou ID de session manquant." };
  }

  try {
    const newRequest = await prisma.request.create({
      data: {
        name: email,
        surname: "", // valeur vide
        functionInChurch: "", // valeur vide
        liveSessionId,
        status: "PENDING",
      },
    });
    

    console.log("Demande enregistrée avec succès :", newRequest);
    return { success: true, message: "Demande envoyée avec succès !" };
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la demande :", error);
    return { success: false, message: "Une erreur est survenue." };
  }
}
