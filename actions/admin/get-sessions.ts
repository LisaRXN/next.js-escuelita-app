'use server';

import { prisma } from '@/lib/prisma';

export async function getSessions() {
  const sessions = await prisma.volunteerSession.findMany({
    orderBy: { date: 'desc' },
  });

  return sessions;
}
