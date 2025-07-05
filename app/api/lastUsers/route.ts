import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export interface Volunteer {
    id: number;
    createdAt: Date | string; 
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    instagram: string | null;
    birthDate: Date | string;
    isAdmin: boolean;
    isActive: boolean;
  }

export async function GET() {
  const users = await prisma.volunteer.findMany({
    orderBy: { createdAt: "asc" },
    take: 3,

  });

  const serializedUsers: Volunteer[] = users.map((u) => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    phone: u.phone,
    email: u.email,
    instagram: u.instagram || '',
    birthDate: u.birthDate.toISOString(),
    isActive: u.isActive,
    isAdmin: u.isAdmin,
    createdAt: u.createdAt.toISOString(),
  }));

  return NextResponse.json(serializedUsers);
}