import { prisma } from "@/lib/prisma";
import { RegistrationStatus } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/is-admin";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  const { userId } = await auth();
  if (!userId || !(await isAdmin(userId))) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { status } = body;

  if (!Object.values(RegistrationStatus).includes(status)) {
    return new NextResponse("Invalid status", { status: 400 });
  }

  try {
    const updated = await prisma.volunteerRegistration.update({
      where: { id: parseInt(id) },
      data: { status: status as RegistrationStatus },
    });
    return NextResponse.json({ registrationId: updated.id, status: updated.status });
  } catch (error) {
    console.error("Error updating registration status:", error);
    return new NextResponse("Error updating registration status", { status: 500 });
  }
}
