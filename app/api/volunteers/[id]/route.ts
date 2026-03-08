import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;

  // Volunteers can only update their own profile (unless admin checked separately)
  const volunteer = await prisma.volunteer.findUnique({ where: { id: parseInt(id) } });
  if (!volunteer) {
    return new NextResponse("Not found", { status: 404 });
  }

  if (volunteer.clerkUserId !== userId && !volunteer.isAdmin) {
    const me = await prisma.volunteer.findUnique({ where: { clerkUserId: userId } });
    if (!me?.isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  }

  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses[0]?.emailAddress;

  const body = await req.json();
  const { firstName, lastName, phone, instagram, birthDate } = body;

  const updateData: Record<string, unknown> = {};
  if (firstName !== undefined) updateData.firstName = firstName;
  if (lastName !== undefined) updateData.lastName = lastName;
  if (phone !== undefined) updateData.phone = phone;
  if (instagram !== undefined) updateData.instagram = instagram;
  if (birthDate !== undefined) updateData.birthDate = new Date(birthDate);
  if (email) updateData.email = email;

  try {
    const updated = await prisma.volunteer.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating volunteer:", error);
    return new NextResponse("Error updating volunteer", { status: 500 });
  }
}
