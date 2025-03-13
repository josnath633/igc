// app/request-form/requestFormAction.ts
"use server";

import  prisma  from "@/lib/prisma"; // Assurez-vous que Prisma Client est importé correctement

export async function RequestFormAction({
  name,
  surname,
  functionInChurch,
}: {
  name: string;
  surname: string;
  functionInChurch: string;
}) {
  // Validation des champs
  if (!name || !surname || !functionInChurch) {
    return { success: false, message: "Tous les champs sont requis." };
  }

  try {
    // Enregistrement dans la base de données via Prisma
    const newRequest = await prisma.request.create({
      data: {
        name,
        surname,
        functionInChurch,
        status: "PENDING", // Le statut par défaut
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
