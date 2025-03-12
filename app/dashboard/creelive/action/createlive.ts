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
    // Vérifier que title et startTime ne sont pas vides
    if (!title || !startTime || !endTime) {
      throw new Error("Title, start time, and end time are required.");
    }

    // Remplacement de null par une chaîne vide pour éviter l'erreur Prisma
    const newLive = await prisma.live.create({
      data: {
        title,
        description: description ?? "", // Assure que Prisma ne reçoit jamais `null`
        startTime,
        endTime,
      },
    });

    return newLive;
  } catch (error) {
    console.error("Error creating live:", error);
    throw new Error("Erreur lors de la création du live");
  }
}
