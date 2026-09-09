import { prisma } from "@/lib/prisma";

/**
 * Liste légère des anniversaires (tous les alumnos).
 * Un anniversaire est un couple (jour, mois) qui revient chaque année,
 * donc on renvoie la date de naissance brute et le calcul jour/mois/âge
 * se fait côté client selon le mois affiché.
 */
export async function GET() {
  const alumnos = await prisma.alumno.findMany({
    select: {
      id: true,
      nombre: true,
      apellidos: true,
      fechaNacimiento: true,
      escuelita: true,
    },
    orderBy: { fechaNacimiento: "asc" },
  });

  return Response.json({ data: alumnos });
}
