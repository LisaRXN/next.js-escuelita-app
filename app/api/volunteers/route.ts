import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses[0]?.emailAddress ?? "";

  const body = await req.json();
  const { firstName, lastName, phone, instagram, birthDate } = body;

  // Check if profile already exists
  const existing = await prisma.volunteer.findFirst({
    where: { OR: [{ clerkUserId: userId }, { email }] },
  });

  if (existing) {
    return new NextResponse("Tu perfil ya esta registrado", { status: 409 });
  }

  try {
    const volunteer = await prisma.volunteer.create({
      data: {
        clerkUserId: userId,
        firstName,
        lastName,
        phone,
        instagram: instagram ?? null,
        email,
        birthDate: new Date(birthDate),
      },
    });

    return NextResponse.json(volunteer, { status: 201 });
  } catch (error) {
    console.error("Error creating volunteer:", error);
    return new NextResponse("Error creating volunteer", { status: 500 });
  }
}
