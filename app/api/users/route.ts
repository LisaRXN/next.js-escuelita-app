import { prisma } from "@/lib/prisma";
import { Prisma, RegistrationStatus, SessionTypes } from "@/generated/prisma";
import { NextRequest } from "next/server";

type SortableColumn = 'firstName' | 'lastName' | 'email' | 'createdAt';

export async function GET(req: NextRequest) {
  
  const searchParams = req.nextUrl.searchParams;

  // Filtres
  const withCounts = searchParams.get("withCounts") === "true";
  const isActiveParam = searchParams.get("isActive");
  const search = searchParams.get("search");
  const sortBy = searchParams.get("sortBy");

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
    if (sortBy && ['firstName', 'lastName', 'email'].includes(sortBy as SortableColumn)) {
      orderBy[sortBy as SortableColumn] = 'asc';
      
    }else {
        orderBy.createdAt = 'desc';
    }

  const users = await prisma.volunteer.findMany({
    where,
    orderBy,
  });

  if (!withCounts) {
    return Response.json(users);
  }

  // ✅ Ajoute le count à chacun — tout d’un coup
  const usersWithCounts = await Promise.all(

    users.map(async (u) => {
      const count = await prisma.volunteerRegistration.count({
        where: {
          volunteerId: u.id,
          status: RegistrationStatus.CONFIRMED,
          session: {
            type: SessionTypes.TUTORING,
          },
        },
      });

      return {
        ...u,
        tutoringCount: count,
      };
    })
  );

  return Response.json(usersWithCounts);
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
