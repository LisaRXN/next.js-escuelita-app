import { prisma } from "@/lib/prisma";
import { Calificacion, Escuelita } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/is-admin";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const seguimiento = await prisma.seguimiento.findUnique({
    where: { id: parseInt(id) },
    include: { alumno: { select: { nombre: true, apellidos: true } } },
  });

  if (!seguimiento) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json({ data: seguimiento });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const { userId } = await auth();
  if (!userId || !(await isAdmin(userId))) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { fechaSesion, escuelita, alumnoId, tema, calificacion, dificultad, observacion } = body;

  const updateData: Record<string, unknown> = {};
  if (fechaSesion !== undefined) updateData.fechaSesion = new Date(fechaSesion);
  if (escuelita !== undefined) updateData.escuelita = escuelita as Escuelita;
  if (alumnoId !== undefined) updateData.alumnoId = Number(alumnoId);
  if (tema !== undefined) updateData.tema = tema;
  if (calificacion !== undefined) updateData.calificacion = calificacion as Calificacion;
  if (dificultad !== undefined) updateData.dificultad = dificultad;
  if (observacion !== undefined) updateData.observacion = observacion;

  try {
    const seguimiento = await prisma.seguimiento.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
    return NextResponse.json(seguimiento);
  } catch (error) {
    console.error("Error updating seguimiento:", error);
    return new NextResponse("Error updating seguimiento", { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { userId } = await auth();
  if (!userId || !(await isAdmin(userId))) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  try {
    await prisma.seguimiento.delete({ where: { id: parseInt(id) } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting seguimiento:", error);
    return new NextResponse("Error deleting seguimiento", { status: 500 });
  }
}
