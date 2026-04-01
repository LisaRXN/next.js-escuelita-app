import { z } from "zod";

export const CreateAlumnoSchema = z.object({
  apellidos: z.string({ required_error: "Los apellidos son obligatorios" }).min(2),
  nombre: z.string({ required_error: "El nombre es obligatorio" }).min(2),
  fechaNacimiento: z.string().refine((d) => !isNaN(Date.parse(d)), { message: "Fecha inválida" }),
  sexo: z.enum(["M", "F"], { required_error: "El sexo es obligatorio" }),
  dni: z.coerce.number({ required_error: "El DNI es obligatorio" }).int().positive(),
  colegio: z.string().min(2).optional(),
  nivel: z.string().min(1).optional(),
  fechaMatricula: z.string().refine((d) => !isNaN(Date.parse(d)), { message: "Fecha inválida" }),
  escuelita: z.enum(["Peruanidad", "Valle_Ecologico"], { required_error: "La escuelita es obligatoria" }),
  necesidadesEspeciales: z.string().optional(),
  estatusInscripcion: z.enum(["Inscrito", "EnEspera", "Cancelado"], { required_error: "El estatus de inscripción es obligatorio" }),
  autorizacionImagen: z.boolean(),
});
