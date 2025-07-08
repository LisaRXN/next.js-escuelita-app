import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getVolunteerSessionStatus } from "@/services/volunteerService";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: Params) {
  const { userId } = await auth();

  console.log('User ID from auth:', userId);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const paramsUrl = await params;
  const sessionId = parseInt(paramsUrl.id, 10);

  if (isNaN(sessionId)) {
    return NextResponse.json({ error: "Invalid session ID" }, { status: 400 });
  }

  try {
    const session = await prisma.volunteerSession.findUnique({
      where: { id: sessionId },
      include: {
        volunteers: {
          include: {
            volunteer: true,
          },
        },
      },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const registeredVolunteers = session.volunteers.map((registration) => ({
      registrationId: registration.id,
      clerkUserId: registration.volunteer.clerkUserId,
      firstName: registration.volunteer.firstName,
      lastName: registration.volunteer.lastName,
      email: registration.volunteer.email,
      phone: registration.volunteer.phone,
      isAdmin: registration.volunteer.isAdmin,
      status: registration.status,
    }));

    // Vérification du statut utilisateur
    const {
      isUserRegistered,
      isSessionInFuture24h,
      isSessionPassed,
      isVolunteerActive,
    } = await getVolunteerSessionStatus(userId, sessionId, session.date);

    return NextResponse.json({
      session,
      registeredVolunteers,
      userStatus: {
        isUserRegistered,
        isSessionInFuture24h,
        isVolunteerActive,
        isSessionPassed,
      },
    });
  } catch (error) {
    console.error("Error getting session:", error);
    return NextResponse.json(
      { error: "Failed to get the session" },
      { status: 500 }
    );
  }
}
