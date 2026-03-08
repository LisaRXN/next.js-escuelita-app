import { prisma } from "@/lib/prisma";
import { Escuelita, Sexo } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/is-admin";

type Params = { params: Promise<{ id: string }> };

export async function GET(
  _req: NextRequest,
  { params }: Params,
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

export async function PATCH(req: NextRequest, { params }: Params) {
  const { userId } = await auth();
  if (!userId || !(await isAdmin(userId))) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { apellidos, nombre, fechaNacimiento, sexo, dni, colegio, nivel, fechaMatricula, escuelita } = body;

  const updateData: Record<string, unknown> = {};
  if (apellidos !== undefined) updateData.apellidos = apellidos;
  if (nombre !== undefined) updateData.nombre = nombre;
  if (fechaNacimiento !== undefined) updateData.fechaNacimiento = new Date(fechaNacimiento);
  if (sexo !== undefined) updateData.sexo = sexo as Sexo;
  if (dni !== undefined) updateData.dni = Number(dni);
  if (colegio !== undefined) updateData.colegio = colegio;
  if (nivel !== undefined) updateData.nivel = nivel;
  if (fechaMatricula !== undefined) updateData.fechaMatricula = new Date(fechaMatricula);
  if (escuelita !== undefined) updateData.escuelita = escuelita as Escuelita;

  try {
    const alumno = await prisma.alumno.update({ where: { id: parseInt(id) }, data: updateData });
    return NextResponse.json(alumno);
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: string }).code === 'P2002') {
      return new NextResponse('Ya existe un alumno con este DNI', { status: 409 });
    }
    console.error('Error updating alumno:', error);
    return new NextResponse('Error updating alumno', { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { userId } = await auth();
  if (!userId || !(await isAdmin(userId))) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { id } = await params;
  try {
    await prisma.alumno.delete({ where: { id: parseInt(id) } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting alumno:', error);
    return new NextResponse('Error deleting alumno', { status: 500 });
  }
}
