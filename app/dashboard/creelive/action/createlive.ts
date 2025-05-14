"use server";

import { prisma } from "@/lib/prisma";

export async function createLive({
  title,
  description,
  startTime,
  endTime,
}: {
  title: string;
  description?: string | null;
  startTime: Date;
  endTime: Date;
}) {
  try {
    // Vérifier que les champs requis sont présents
    if (!title || !startTime || !endTime) {
      throw new Error("Title, start time, and end time are required.");
    }

    // Créer le live
    const newLive = await prisma.live.create({
      data: {
        title,
        description: description ?? "", // Utilise une chaîne vide si null ou undefined
        startTime,
        endTime,
        dateTime: startTime, // On prend startTime comme date de référence pour `dateTime`
      },
    });

    return newLive;
  } catch (error) {
    console.error("Error creating live:", error);
    throw new Error("Erreur lors de la création du live");
  }
}
