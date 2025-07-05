import { prisma } from './prisma';

export async function isAdmin(userId: string | null): Promise<boolean> {
  if (!userId) return false;

  const volunteer = await prisma.volunteer.findUnique({
    where: { clerkUserId: userId },
  });

  return volunteer?.isAdmin ?? false;
}
