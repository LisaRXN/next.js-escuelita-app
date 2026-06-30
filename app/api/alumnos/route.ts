import { prisma } from "@/lib/prisma";
import { Escuelita, EstatusInscripcion, Prisma, Sexo } from "@/generated/prisma";
import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/is-admin";
import { NextResponse } from "next/server";

const PAGE_SIZE = 20;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const nivel = searchParams.get("nivel");
  const escuelita = searchParams.get("escuelita");
  const sexo = searchParams.get("sexo");
  const estatus = searchParams.get("estatus");
  const autorizacionImagen = searchParams.get("autorizacionImagen");
  const edadMin = searchParams.get("edadMin");
  const edadMax = searchParams.get("edadMax");
  const search = searchParams.get("search");
  const all = searchParams.get("all") === "true";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const skip = (page - 1) * PAGE_SIZE;

  const where: Prisma.AlumnoWhereInput = {};

  if (nivel && nivel !== "") {
    where.nivel = nivel;
  }

  if (escuelita && escuelita !== "") {
    where.escuelita = escuelita as Escuelita;
  }

  if (sexo && sexo !== "") {
    where.sexo = sexo as Sexo;
  }

  if (estatus && estatus !== "") {
    where.estatusInscripcion = estatus as EstatusInscripcion;
  }

  if (autorizacionImagen === "true" || autorizacionImagen === "false") {
    where.autorizacionImagen = autorizacionImagen === "true";
  }

  // Filtre par tranche d'âge -> bornes sur fechaNacimiento.
  // edadMin = N  =>  né il y a au moins N ans  =>  fechaNacimiento <= today - N ans
  // edadMax = M  =>  pas encore M+1 ans        =>  fechaNacimiento >  today - (M+1) ans
  const min = edadMin ? parseInt(edadMin, 10) : null;
  const max = edadMax ? parseInt(edadMax, 10) : null;
  if ((min !== null && !Number.isNaN(min)) || (max !== null && !Number.isNaN(max))) {
    const fechaNacimiento: Prisma.DateTimeFilter = {};
    const now = new Date();
    if (min !== null && !Number.isNaN(min)) {
      const upper = new Date(now);
      upper.setFullYear(upper.getFullYear() - min);
      fechaNacimiento.lte = upper;
    }
    if (max !== null && !Number.isNaN(max)) {
      const lower = new Date(now);
      lower.setFullYear(lower.getFullYear() - (max + 1));
      fechaNacimiento.gt = lower;
    }
    where.fechaNacimiento = fechaNacimiento;
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
      ...(all ? {} : { skip, take: PAGE_SIZE }),
    }),
    prisma.alumno.count({ where }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return Response.json({ data: alumnos, total, totalPages, page });
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId || !(await isAdmin(userId))) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const body = await req.json();
  const { apellidos, nombre, fechaNacimiento, sexo, dni, colegio, nivel, fechaMatricula, escuelita, necesidadesEspeciales } = body;

  try {
    const alumno = await prisma.alumno.create({
      data: {
        apellidos,
        nombre,
        fechaNacimiento: new Date(fechaNacimiento),
        sexo: sexo as Sexo,
        dni: Number(dni),
        colegio,
        nivel,
        fechaMatricula: new Date(fechaMatricula ?? new Date()),
        escuelita: escuelita as Escuelita,
        necesidadesEspeciales,
      },
    });

    return NextResponse.json(alumno, { status: 201 });
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: string }).code === 'P2002') {
      return new NextResponse('Ya existe un alumno con este DNI', { status: 409 });
    }
    console.error('Error creating alumno:', error);
    return new NextResponse('Error creating alumno', { status: 500 });
  }
}
