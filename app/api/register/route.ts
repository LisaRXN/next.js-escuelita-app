import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();
  const { sessionId } = body;

  // On cherche le volontaire correspondant au userId Clerk
  const volunteer = await prisma.volunteer.findUnique({
    where: { clerkUserId: userId },
  });

  if (!volunteer) {
    return new NextResponse("Utilisateur introuvable", { status: 404 });
  }

  // Vérifier si déjà inscrit à cette session
  const existingRegistration = await prisma.volunteerRegistration.findFirst({
    where: {
      volunteerId: volunteer.id,
      sessionId,
    },
  });

  if (existingRegistration) {
    return new NextResponse("Déjà inscrit à cette session", { status: 400 });
  }

  // Vérifier si la session est complète
  const session = await prisma.volunteerSession.findUnique({
    where: { id: sessionId },
    include: {
      volunteers: true,
    },
  });

  if (!session) {
    return new NextResponse("Session introuvable", { status: 404 });
  }

  const isFull = session.volunteers.length >= session.capacity;

  if (isFull) {
    return new NextResponse("Session complète", { status: 400 });
  }

  // Inscription dans la table de liaison
  try {
    await prisma.volunteerRegistration.create({
      data: {
        volunteerId: volunteer.id,
        sessionId,
      },
    });

    return new NextResponse("Inscription réussie");
  } catch (error) {
    console.log(error);
    return new NextResponse("Erreur d’inscription", { status: 500 });
  }
}



export async function DELETE(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse('Unauthorized', { status: 401 });

  const body = await req.json();
  const { sessionId } = body;

  try {
    const volunteer = await prisma.volunteer.findUnique({
      where: { clerkUserId: userId },
    });

    if (!volunteer) {
      return new NextResponse('Utilisateur introuvable', { status: 404 });
    }

    // On vérifie que la session existe et récupère la date
    const session = await prisma.volunteerSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return new NextResponse('Session introuvable', { status: 404 });
    }

    // On vérifie que la session est dans plus de 24h
    const now = new Date();
    const diffInHours = (session.date.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return new NextResponse('Trop tard pour se désinscrire', { status: 400 });
    }

    // Supprimer l'inscription si elle existe
    await prisma.volunteerRegistration.deleteMany({
      where: {
        volunteerId: volunteer.id,
        sessionId,
      },
    });

    return new NextResponse('Désinscription réussie');
  } catch (error) {
    console.error('Erreur dans la désinscription :', error);
    return new NextResponse('Erreur lors de la désinscription', { status: 500 });
  }
}
