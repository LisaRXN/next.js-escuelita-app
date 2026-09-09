import type { Alumno } from "@/generated/prisma";

const ESCUELITA_LABELS: Record<string, string> = {
  Peruanidad: "Peruanidad",
  Valle_Ecologico: "Valle Ecológico",
};

const SEXO_LABELS: Record<string, string> = {
  M: "Masculino",
  F: "Femenino",
};

const ESTATUS_LABELS: Record<string, string> = {
  Inscrito: "Inscrito",
  EnEspera: "En espera",
  Cancelado: "Cancelado",
};

/** Âge en années révolues à partir de la date de naissance. */
function calcEdad(fechaNacimiento: string | Date): number | "" {
  const birth = new Date(fechaNacimiento);
  if (Number.isNaN(birth.getTime())) return "";
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return age;
}

function formatDate(value: string | Date | null | undefined): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

/**
 * Génère et télécharge un fichier Excel à partir d'une liste d'alumnos.
 * Import dynamique de `xlsx` pour ne pas alourdir le bundle initial.
 */
export async function exportAlumnosExcel(alumnos: Alumno[]) {
  const { utils, writeFile } = await import("xlsx");

  const rows = alumnos.map((a) => ({
    Apellidos: a.apellidos,
    Nombre: a.nombre,
    DNI: a.dni,
    Sexo: SEXO_LABELS[a.sexo] ?? a.sexo,
    "Fecha de nacimiento": formatDate(a.fechaNacimiento),
    Edad: calcEdad(a.fechaNacimiento),
    Colegio: a.colegio ?? "",
    Nivel: a.nivel ?? "",
    Escuelita: ESCUELITA_LABELS[a.escuelita] ?? a.escuelita,
    Estatus: ESTATUS_LABELS[a.estatusInscripcion] ?? a.estatusInscripcion,
    "Autorización imagen": a.autorizacionImagen ? "Sí" : "No",
    "Fecha de matrícula": formatDate(a.fechaMatricula),
    "Necesidades especiales": a.necesidadesEspeciales ?? "",
  }));

  const ws = utils.json_to_sheet(rows);
  ws["!cols"] = [
    { wch: 18 }, // Apellidos
    { wch: 16 }, // Nombre
    { wch: 12 }, // DNI
    { wch: 12 }, // Sexo
    { wch: 16 }, // Fecha de nacimiento
    { wch: 6 },  // Edad
    { wch: 22 }, // Colegio
    { wch: 14 }, // Nivel
    { wch: 16 }, // Escuelita
    { wch: 12 }, // Estatus
    { wch: 16 }, // Autorización imagen
    { wch: 16 }, // Fecha de matrícula
    { wch: 28 }, // Necesidades especiales
  ];

  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Alumnos");

  const today = new Date()
    .toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" })
    .replace(/\//g, "-");
  writeFile(wb, `alumnos_${today}.xlsx`);
}
