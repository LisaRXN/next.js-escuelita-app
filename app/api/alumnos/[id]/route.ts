import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const alumno = await prisma.alumno.findUnique({
    where: { id: parseInt(id) },
  });

  if (!alumno) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json({ data: alumno });
}
