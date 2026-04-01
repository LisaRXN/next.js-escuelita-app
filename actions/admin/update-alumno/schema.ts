import { z } from "zod";

export const UpdateAlumnoSchema = z.object({
  id: z.coerce.number().int().positive(),
  apellidos: z.string().min(2),
  nombre: z.string().min(2),
  fechaNacimiento: z.string().refine((d) => !isNaN(Date.parse(d)), { message: "Fecha inválida" }),
  sexo: z.enum(["M", "F"]),
  dni: z.coerce.number().int().positive(),
  colegio: z.string().min(2).optional(),
  nivel: z.string().min(1).optional(),
  fechaMatricula: z.string().refine((d) => !isNaN(Date.parse(d)), { message: "Fecha inválida" }),
  escuelita: z.enum(["Peruanidad", "Valle_Ecologico"]),
  necesidadesEspeciales: z.string().optional(),
  estatusInscripcion: z.enum(["Inscrito", "EnEspera", "Cancelado"]),
  autorizacionImagen: z.boolean(),
});
