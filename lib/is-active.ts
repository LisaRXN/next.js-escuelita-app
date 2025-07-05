import { prisma } from './prisma';
import { redirect } from "next/navigation";

export async function isActive(userId: string | null): Promise<boolean> {
  if (!userId) return false;

  const volunteer = await prisma.volunteer.findUnique({
    where: { clerkUserId: userId },
  });

  if (!volunteer) {
    redirect("/"); // ou "/not-authorized"
  }

  return volunteer?.isActive ?? false;
}
