import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { isAdmin } from '@/lib/is-admin';

export interface VolunteerSession {
  id: number;
  title: string;
  date: string;
  description: string | null;
  location: string;
  capacity: number;
  image: string;
  type: string;
  createdAt: string;
}

export async function GET() {
  const sessions = await prisma.volunteerSession.findMany({
    orderBy: { date: 'desc' },
  });

  // Prisma retourne des Dates en JS, ici on convertit en ISO string pour simplifier le JSON
  const serializedSessions: VolunteerSession[] = sessions.map((s) => ({
    id: s.id,
    title: s.title,
    date: s.date.toISOString(),
    description: s.description,
    location: s.location,
    capacity: s.capacity,
    image: s.image,
    type: s.type,
    createdAt: s.createdAt.toISOString(),
  }));

  return NextResponse.json(serializedSessions);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId || !(await isAdmin(userId))) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const body = await req.json();
  const { title, date, description, location, type, image, capacity } = body;

  try {
    const session = await prisma.volunteerSession.create({
      data: {
        title,
        date: new Date(date),
        description,
        location,
        type,
        image,
        capacity: Number(capacity),
      },
    });

    return NextResponse.json({
      ...session,
      date: session.date.toISOString(),
      createdAt: session.createdAt.toISOString(),
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating session:', error);
    return new NextResponse('Error creating session', { status: 500 });
  }
}
