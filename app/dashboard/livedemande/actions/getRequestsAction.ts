"use server";

import  prisma  from "@/lib/prisma"; // Assurez-vous que Prisma est bien configuré

// Action serveur pour récupérer toutes les demandes
export async function getRequestsAction() {
  try {
    const requests = await prisma.request.findMany(); // Récupérer toutes les demandes
    return requests; // Retourner les demandes
  } catch (error) {
    console.error("Erreur lors de la récupération des demandes", error);
    throw new Error("Impossible de récupérer les demandes.");
  }
}
