import { prisma } from "@/lib/prisma";
import { Calificacion, Escuelita, Prisma } from "@/generated/prisma";
import { NextRequest } from "next/server";

const PAGE_SIZE = 20;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const escuelita = searchParams.get("escuelita");
  const calificacion = searchParams.get("calificacion");
  const search = searchParams.get("search");
  const alumnoId = searchParams.get("alumnoId");
  const statsOnly = searchParams.get("statsOnly") === "true";
  const all = searchParams.get("all") === "true";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const skip = (page - 1) * PAGE_SIZE;

  const where: Prisma.SeguimientoWhereInput = {};

  if (escuelita && escuelita !== "") {
    where.escuelita = escuelita as Escuelita;
  }
  if (calificacion && calificacion !== "") {
    where.calificacion = calificacion as Calificacion;
  }
  if (alumnoId) {
    where.alumnoId = parseInt(alumnoId);
  }
  if (search && search !== "") {
    where.OR = [
      { alumno: { nombre: { contains: search, mode: "insensitive" } } },
      { alumno: { apellidos: { contains: search, mode: "insensitive" } } },
      { tema: { contains: search, mode: "insensitive" } },
    ];
  }

  // Stats par calificación
  const statsByCalificacion = await prisma.seguimiento.groupBy({
    by: ["calificacion"],
    where,
    _count: { calificacion: true },
  });

  const total = await prisma.seguimiento.count({ where });

  if (statsOnly) {
    return Response.json({ statsByCalificacion, total });
  }

  if (all) {
    const seguimientos = await prisma.seguimiento.findMany({
      where,
      include: { alumno: { select: { nombre: true, apellidos: true } } },
      orderBy: { fechaSesion: "desc" },
    });
    return Response.json({ data: seguimientos, total, statsByCalificacion });
  }

  const seguimientos = await prisma.seguimiento.findMany({
    where,
    include: { alumno: { select: { nombre: true, apellidos: true } } },
    orderBy: { fechaSesion: "desc" },
    skip,
    take: PAGE_SIZE,
  });

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return Response.json({ data: seguimientos, total, totalPages, page, statsByCalificacion });
}
