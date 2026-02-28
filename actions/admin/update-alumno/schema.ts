import { z } from "zod";

export const UpdateAlumnoSchema = z.object({
  id: z.coerce.number().int().positive(),
  apellidos: z.string().min(2),
  nombre: z.string().min(2),
  fechaNacimiento: z.string().refine((d) => !isNaN(Date.parse(d)), { message: "Fecha inválida" }),
  sexo: z.enum(["M", "F"]),
  dni: z.coerce.number().int().positive(),
  colegio: z.string().min(2),
  nivel: z.string().min(1),
  fechaMatricula: z.string().refine((d) => !isNaN(Date.parse(d)), { message: "Fecha inválida" }),
  escuelita: z.enum(["Peruanidad", "Valle_Ecologico"]),
});
