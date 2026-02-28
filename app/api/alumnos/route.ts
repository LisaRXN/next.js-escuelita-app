import { prisma } from "@/lib/prisma";
import { Escuelita, Prisma } from "@/generated/prisma";
import { NextRequest } from "next/server";

const PAGE_SIZE = 20;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const nivel = searchParams.get("nivel");
  const escuelita = searchParams.get("escuelita");
  const search = searchParams.get("search");
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const skip = (page - 1) * PAGE_SIZE;

  const where: Prisma.AlumnoWhereInput = {};

  if (nivel && nivel !== "") {
    where.nivel = nivel;
  }

  if (escuelita && escuelita !== "") {
    where.escuelita = escuelita as Escuelita;
  }

  if (search && search !== "") {
    where.OR = [
      { nombre: { contains: search, mode: "insensitive" } },
      { apellidos: { contains: search, mode: "insensitive" } },
      { colegio: { contains: search, mode: "insensitive" } },
    ];
  }

  const [alumnos, total] = await Promise.all([
    prisma.alumno.findMany({
      where,
      orderBy: { apellidos: "asc" },
      skip,
      take: PAGE_SIZE,
    }),
    prisma.alumno.count({ where }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return Response.json({ data: alumnos, total, totalPages, page });
}
