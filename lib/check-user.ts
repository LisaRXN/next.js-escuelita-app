// /lib/checkProfile.ts
import { prisma } from "@/lib/prisma";

export async function isVolunteerProfileComplete(userId: string | null) {

  if (!userId) return false;

  const volunteer = await prisma.volunteer.findUnique({
    where: { clerkUserId: userId },
  });

  if (!volunteer) return false;

  return !!(volunteer.firstName && volunteer.lastName && volunteer.email && volunteer.phone);
}
