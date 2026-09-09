import { z } from "zod";

export const CreateSeguimientoSchema = z.object({
  sessionId: z.coerce.number().int().positive({ message: "La sesión es obligatoria" }),
  escuelita: z.enum(["Peruanidad", "Valle_Ecologico"]),
  alumnoId: z.coerce.number().int().positive(),
  tema: z.string().min(1, { message: "El tema es obligatorio" }),
  calificacion: z.enum(["Excelente", "Bueno", "Regular", "Con_dificultad", "Con_mucha_dificultad"]),
  dificultad: z.string(),
  observacion: z.string(),
});
