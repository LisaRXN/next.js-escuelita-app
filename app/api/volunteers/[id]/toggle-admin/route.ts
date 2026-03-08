import { prisma } from "@/lib/prisma";
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
  const { isAdmin: newIsAdmin } = body;

  try {
    const updated = await prisma.volunteer.update({
      where: { id: parseInt(id) },
      data: { isAdmin: newIsAdmin },
    });
    return NextResponse.json({ volunteerId: updated.id, isAdmin: updated.isAdmin });
  } catch (error) {
    console.error("Error toggling admin:", error);
    return new NextResponse("Error toggling admin", { status: 500 });
  }
}
