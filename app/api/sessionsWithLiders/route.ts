// pages/api/sessions.ts (ou app/api/sessions/route.ts selon ton arborescence)
import { prisma } from "@/lib/prisma"; // adapte si ton import est différent
import { NextResponse } from "next/server";

export async function GET() {
  const sessions = await prisma.volunteerSession.findMany({
    include: {
      volunteers: {
        include: {
          volunteer: true,
        },
      },
    },
    orderBy: { date: "desc" },
  });

  

  // Ajoute la liste des admins inscrits à chaque session
  const sessionsWithLiders = sessions.map((session) => {
    const liders = session.volunteers
      .filter((reg) => reg.volunteer.isAdmin)
      .map((reg) => ({
        id: reg.volunteer.id,
        firstName: reg.volunteer.firstName,
        lastName: reg.volunteer.lastName,
        email: reg.volunteer.email,
      }));

    return {
      ...session,
      liders,
    };
  });

  return NextResponse.json(sessionsWithLiders);
}
