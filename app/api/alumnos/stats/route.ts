import { prisma } from "@/lib/prisma";
import { Escuelita } from "@/generated/prisma";

/**
 * Compteurs d'alumnos par escuelita en une seule requête (groupBy),
 * au lieu de N requêtes count() séparées.
 */
export async function GET() {
  const grouped = await prisma.alumno.groupBy({
    by: ["escuelita"],
    _count: { _all: true },
  });

  const byEscuelita = Object.fromEntries(
    grouped.map((g) => [g.escuelita, g._count._all])
  ) as Record<Escuelita, number>;

  const counts = {
    Peruanidad: byEscuelita.Peruanidad ?? 0,
    Valle_Ecologico: byEscuelita.Valle_Ecologico ?? 0,
  };

  const total = counts.Peruanidad + counts.Valle_Ecologico;

  return Response.json({ counts, total });
}
