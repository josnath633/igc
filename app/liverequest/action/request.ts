// /app/api/request/RequestFormAction.ts
'use server';

import { prisma } from "@/lib/prisma";

export async function RequestFormAction({
  name,
  functionInChurch,
  liveSessionId,
}: {
  name: string;
  functionInChurch: string;
  liveSessionId: string;
}) {
  // Validation des champs requis
  if (!name ||  !functionInChurch || !liveSessionId) {
    return { success: false, message: "Tous les champs sont requis." };
  }

  try {
    const newRequest = await prisma.request.create({
      data: {
        name,
        surname: '',
        functionInChurch,
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
