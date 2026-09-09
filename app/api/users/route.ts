import { prisma } from "@/lib/prisma";
import { Prisma, RegistrationStatus, SessionTypes, Volunteer } from "@/generated/prisma";
import { NextRequest } from "next/server";

type SortableColumn = "firstName" | "lastName" | "email" | "createdAt";

const PAGE_SIZE = 20;

export async function GET(req: NextRequest) {

  const searchParams = req.nextUrl.searchParams;

  // Filtres
  const withCounts = searchParams.get("withCounts") === "true";
  const all = searchParams.get("all") === "true";
  const isActiveParam = searchParams.get("isActive");
  const search = searchParams.get("search");
  const sortBy = searchParams.get("sortBy");
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const skip = all ? 0 : (page - 1) * PAGE_SIZE;

  const where: Prisma.VolunteerWhereInput = {};
  const orderBy: Prisma.VolunteerOrderByWithRelationInput = {};

  // ✅ Filtre par actif/inactif
  if (isActiveParam === "true") {
    where.isActive = true;
  } else if (isActiveParam === "false") {
    where.isActive = false;
  }

  // ✅ Filtre par nom, prénom ou email
  if (search && search !==  "") {
    where.OR = [
      { firstName: { contains: search, mode: "insensitive" } },
      { lastName: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

    // ✅ Logique de tri
    if (sortBy && ["firstName", "lastName", "email"].includes(sortBy as SortableColumn)) {
      orderBy[sortBy as SortableColumn] = "asc";

    }else {
        orderBy.createdAt = "desc";
    }

  try {
  const [users, total] = await Promise.all([
    prisma.volunteer.findMany({
      where,
      orderBy,
      skip,
      ...(all ? {} : { take: PAGE_SIZE }),
    }),
    prisma.volunteer.count({ where }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (!withCounts) {
    return Response.json({ data: users, total, totalPages, page });
  }

  // ✅ Compte les inscriptions TUTORING confirmées pour tous les bénévoles
  // en UNE seule requête (groupBy) au lieu d'un count par bénévole (N+1).
  // Le N+1 saturait le pooler Supabase et provoquait des 500.
  const grouped = await prisma.volunteerRegistration.groupBy({
    by: ["volunteerId"],
    where: {
      volunteerId: { in: users.map((u) => u.id) },
      status: RegistrationStatus.CONFIRMED,
      session: {
        type: SessionTypes.TUTORING,
      },
    },
    _count: { _all: true },
  });

  const countByVolunteer = new Map(
    grouped.map((g) => [g.volunteerId, g._count._all])
  );

  const usersWithCounts = users.map((u: Volunteer) => ({
    ...u,
    tutoringCount: countByVolunteer.get(u.id) ?? 0,
  }));

  return Response.json({ data: usersWithCounts, total, totalPages, page });
  } catch (error) {
    console.error("[GET /api/users] erreur:", error);
    return Response.json(
      { error: "Erreur serveur lors de la récupération des bénévoles" },
      { status: 500 }
    );
  }
}


// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export interface Volunteer {
//   id: number;
//   createdAt: Date | string; 
//   firstName: string;
//   lastName: string;
//   phone: string;
//   email: string;
//   instagram: string | null;
//   birthDate: Date | string;
//   isAdmin: boolean;
//   isActive: boolean;
// }

// export async function GET() {
//   const users = await prisma.volunteer.findMany({
//     orderBy: { createdAt: "asc" },
//   });

//   // Prisma retourne des Dates en JS, ici on convertit en ISO string pour simplifier le JSON
//   const serializedUsers: Volunteer[] = users.map((u) => ({
//     id: u.id,
//     firstName: u.firstName,
//     lastName: u.lastName,
//     phone: u.phone,
//     email: u.email,
//     instagram: u.instagram || '',
//     birthDate: u.birthDate.toISOString(),
//     isActive: u.isActive,
//     isAdmin: u.isAdmin,
//     createdAt: u.createdAt.toISOString(),
//   }));

//   return NextResponse.json(serializedUsers);
// }
