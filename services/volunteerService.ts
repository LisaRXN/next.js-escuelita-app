import { Volunteer } from "@/generated/prisma";
import { prisma } from "@/lib/prisma"; 

export async function fetchVolunteers(): Promise<Volunteer[]> {
  const res = await fetch("/api/users");
  if (!res.ok) throw new Error("Failed to fetch volunteers");
  return res.json();
}

export async function fetchLastVolunteers(): Promise<Volunteer[]> {
  const res = await fetch("/api/lastUsers");
  if (!res.ok) throw new Error("Failed to fetch volunteers");
  return res.json();
}


export async function getVolunteerSessionStatus(userId: string, sessionId: number, sessionDate: Date) {
  let isUserRegistered = false;
  let isSessionInFuture24h = false;
  let isSessionPassed = false;
  let isVolunteerActive = false;

  if (userId) {
    const volunteer = await prisma.volunteer.findUnique({
      where: { clerkUserId: userId },
      include: { registrations: true },
    });

    if (volunteer) {
      isUserRegistered = volunteer.registrations.some(
        (reg) => reg.sessionId === sessionId
      );
      isVolunteerActive = volunteer.isActive;
    }

    const now = new Date();
    const diffHours =
      (new Date(sessionDate).getTime() - now.getTime()) / (1000 * 60 * 60);
      isSessionPassed = diffHours < 0;
      isSessionInFuture24h = diffHours > 0 && diffHours <= 24;
  }

  return {
    isUserRegistered,
    isSessionInFuture24h,
    isVolunteerActive,
    isSessionPassed,
  };
}