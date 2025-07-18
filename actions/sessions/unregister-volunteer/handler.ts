"use server"

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";

export const handler = async (data: InputType): Promise<ReturnType> => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { error: "Unauthorized" };
    }

    const { sessionId, clerkUserId } = data;

    // Chercher le volontaire lié à Clerk
    const volunteer = await prisma.volunteer.findUnique({
      where: { clerkUserId: clerkUserId },
    });

    if (!volunteer) {
      return { error: "Unauthorized" };
    }

    // Vérifier si déjà inscrit
    const existingRegistration = await prisma.volunteerRegistration.findFirst({
      where: {
        volunteerId: volunteer.id,
        sessionId,
      },
    });

    if (!existingRegistration) {
      return { error: "Voluntario no esta inscrito a la sesión" };
    }

    // Récupérer la session
    const session = await prisma.volunteerSession.findUnique({
      where: { id: sessionId }
    });

    if (!session) {
      return { error: "Ninguna sesión encontrada" };
    }

    // On vérifie que la session est dans plus de 24h
    const now = new Date();
    const diffInHours = (session.date.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 0 && !volunteer.isAdmin) {
      return { error: "No se puede cancelar, la sesión ya ha pasado" };
    }

    // Supprimer l'inscription 
    await prisma.volunteerRegistration.deleteMany({
      where: {
        volunteerId: volunteer.id,
        sessionId,
      },
    });

    return {
      data: {
        sessionId,
        firstName: volunteer.firstName,
      },
    };
  } catch (error) {
    console.error("Error unregistering volunteer:", error);
    return { error: "Error interno del servidor" };
  }
};
