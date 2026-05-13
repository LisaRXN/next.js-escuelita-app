import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getVolunteerSessionStatus } from "@/services/volunteerService";
import { isAdmin } from "@/lib/is-admin";

interface Params {
  params: Promise<{ id: string }>
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
      where: { id: sessionId, deletedAt: null },
      include: {
        volunteers: {
          include: {
            volunteer: true,
          },
          orderBy: {
            createdAt: "asc",
          }
        },
      },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }


    let volunteerCounter = 0;
    const registeredVolunteers = session.volunteers.map((registration) => ({
      registrationId: registration.id,
      registrationOrder: registration.volunteer.isAdmin ? 0 : ++volunteerCounter,
      registeredAt: registration.createdAt.toISOString(),
      clerkUserId: registration.volunteer.clerkUserId,
      firstName: registration.volunteer.firstName,
      lastName: registration.volunteer.lastName,
      email: registration.volunteer.email,
      phone: registration.volunteer.phone,
      isAdmin: registration.volunteer.isAdmin,
      status: registration.status,
    }));

    const seguimientos = await prisma.seguimiento.findMany({
      where: { sessionId },
      include: {
        alumno: { select: { nombre: true, apellidos: true } },
        volunteer: { select: { firstName: true, lastName: true, clerkUserId: true } },
      },
      orderBy: { createdAt: "asc" },
    });

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
      seguimientos,
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

export async function PATCH(req: Request, { params }: Params) {
  const { userId } = await auth();
  if (!userId || !(await isAdmin(userId))) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const paramsUrl = await params;
  const sessionId = parseInt(paramsUrl.id, 10);
  if (isNaN(sessionId)) {
    return NextResponse.json({ error: 'Invalid session ID' }, { status: 400 });
  }

  const body = await req.json();
  const updateData: Record<string, unknown> = {};
  if (body.title !== undefined) updateData.title = body.title;
  if (body.description !== undefined) updateData.description = body.description;
  if (body.location !== undefined) updateData.location = body.location;
  if (body.capacity !== undefined) updateData.capacity = Number(body.capacity);
  if (body.image !== undefined) updateData.image = body.image;
  if (body.type !== undefined) updateData.type = body.type;
  if (body.date !== undefined) updateData.date = new Date(body.date);

  try {
    const session = await prisma.volunteerSession.update({
      where: { id: sessionId },
      data: updateData,
    });

    return NextResponse.json({
      ...session,
      date: session.date.toISOString(),
      createdAt: session.createdAt.toISOString(),
    });
  } catch (error) {
    console.error('Error updating session:', error);
    return new NextResponse('Error updating session', { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const { userId } = await auth();
  if (!userId || !(await isAdmin(userId))) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const paramsUrl = await params;
  const sessionId = parseInt(paramsUrl.id, 10);
  if (isNaN(sessionId)) {
    return NextResponse.json({ error: 'Invalid session ID' }, { status: 400 });
  }

  try {
    await prisma.volunteerSession.update({ where: { id: sessionId }, data: { deletedAt: new Date() } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting session:', error);
    return new NextResponse('Error deleting session', { status: 500 });
  }
}
