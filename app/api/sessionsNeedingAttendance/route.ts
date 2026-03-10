import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { isAdmin } from '@/lib/is-admin';

export async function GET() {
  const { userId } = await auth();
  if (!userId || !(await isAdmin(userId))) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const sessions = await prisma.volunteerSession.findMany({
    where: {
      volunteers: { some: {} },
    },
    include: {
      volunteers: {
        select: { status: true },
      },
    },
    orderBy: { date: 'desc' },
    take: 10,
  });

  const result = sessions.map((s) => ({
    id: s.id,
    title: s.title,
    date: s.date.toISOString(),
    type: s.type,
    location: s.location,
    pendingCount: s.volunteers.filter((r) => r.status === 'PENDING').length,
  }));

  return NextResponse.json(result);
}
