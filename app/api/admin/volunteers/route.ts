import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/is-admin";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();

  if (!userId || !(await isAdmin(userId))) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const volunteers = await prisma.volunteer.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(volunteers);
  } catch (error) {
    console.error("Erreur récupération volontaires :", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}
