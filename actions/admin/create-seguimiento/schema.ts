import { z } from "zod";

export const CreateSeguimientoSchema = z.object({
  fechaSesion: z.string().refine((d) => !isNaN(Date.parse(d)), { message: "Fecha inválida" }),
  escuelita: z.enum(["Peruanidad", "Valle_Ecologico"]),
  alumnoId: z.coerce.number().int().positive(),
  tema: z.string().min(1, { message: "El tema es obligatorio" }),
  calificacion: z.enum(["Excelente", "Bueno", "Regular", "Con_dificultad", "Con_mucha_dificultad"]),
  dificultad: z.string(),
  observacion: z.string(),
});
