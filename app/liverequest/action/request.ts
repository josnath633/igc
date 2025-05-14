'use server'
import { prisma } from "@/lib/prisma";

export async function RequestFormAction({
  name,
  surname,
  functionInChurch,
  liveSessionId, // ID de la session live
}: {
  name: string;
  surname: string;
  functionInChurch: string;
  liveSessionId: string;  // Ajoutez liveSessionId comme paramètre
}) {
  // Validation des champs
  if (!name || !surname || !functionInChurch || !liveSessionId) {
    return { success: false, message: "Tous les champs sont requis." };
  }

  // Ajout d'un log pour vérifier si liveSessionId est bien défini
  console.log("ID de la session live:", liveSessionId);  // Ajoute un log ici

  try {
    // Enregistrement de la demande dans la base de données avec la référence du live
    const newRequest = await prisma.request.create({
      data: {
        name,
        surname,
        functionInChurch,
        liveSessionId,  // Enregistrer l'ID du live avec la demande
        status: "PENDING",  // Le statut par défaut
      },
    });

    console.log("Demande enregistrée avec succès :", newRequest);

    // Retour du message de succès
    return { success: true, message: "Demande envoyée avec succès !" };
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la demande :", error);
    return { success: false, message: "Une erreur est survenue." };
  }
}
