import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { SessionTypes } from "@/generated/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  // Volunteer courant (pour savoir s'il est inscrit)
  const currentVolunteer = await prisma.volunteer.findUnique({
    where: { clerkUserId: userId },
    select: { id: true },
  });

  const sessions = await prisma.volunteerSession.findMany({
    where: { deletedAt: null, type: SessionTypes.TUTORING },
    orderBy: { date: "asc" },
    include: {
      volunteers: {
        include: {
          volunteer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              isAdmin: true,
            },
          },
        },
      },
    },
  });

  const result = sessions.map((s) => {
    const coordinators = s.volunteers
      .filter((r) => r.volunteer.isAdmin)
      .map((r) => ({
        id: r.volunteer.id,
        firstName: r.volunteer.firstName,
        lastName: r.volunteer.lastName,
        registrationId: r.id,
      }));

    const isUserRegistered = currentVolunteer
      ? s.volunteers.some((r) => r.volunteerId === currentVolunteer.id)
      : false;

    return {
      id: s.id,
      title: s.title,
      date: s.date.toISOString(),
      location: s.location,
      capacity: s.capacity,
      coordinators,
      coordinatorCount: coordinators.length,
      isUserRegistered,
    };
  });

  return NextResponse.json(result);
}
