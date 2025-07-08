// /app/api/create-volunteer/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { CreateVolunteerSchema } from "@/features/create-volunteer/schema"; // Zod schema


export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = CreateVolunteerSchema.safeParse(body);

  if (!parsed.success) {
    // Transforme les erreurs zod en fieldErrors compatibles avec ton hook
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json({ fieldErrors, error: "Champs invalides" }, { status: 400 });
  }

  const { firstName, lastName, email, phone, instagram, birthDate } = parsed.data;

  try {
    const volunteer = await prisma.volunteer.create({
      data: {
        clerkUserId: userId,
        firstName,
        lastName,
        phone,
        instagram,
        email,
        birthDate: new Date(birthDate),
        createdAt: new Date(),
      },
    });

    return NextResponse.json({
      data: {
        firstName: volunteer.firstName,
        lastName: volunteer.lastName,
        email: volunteer.email,
        phone: volunteer.phone,
        instagram: volunteer.instagram ?? "",
        birthDate: volunteer.birthDate?.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error creating volunteer:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la création du volontaire" },
      { status: 500 }
    );
  }
}
