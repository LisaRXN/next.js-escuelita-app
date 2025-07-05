import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  const { sessionId } = data;

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
      throw new Error("Session not found");
    }

    const registeredVolunteers = session.volunteers.map((registration) => ({
      id: registration.volunteer.id,
      firstName: registration.volunteer.firstName,
      lastName: registration.volunteer.lastName,
      email: registration.volunteer.email,
      phone: registration.volunteer.phone,
      status: registration.status,
    }));

    return {
      data: {
        session,
        registeredVolunteers,
      },
    };
  } catch (error) {
    console.error("Error getting session:", error);
    await prisma.$disconnect();
    return { error: "Failed to get the session" };
  }
};
