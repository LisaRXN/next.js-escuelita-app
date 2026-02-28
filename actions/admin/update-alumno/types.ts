import { z } from "zod";
import { UpdateAlumnoSchema } from "./schema";

export type InputType = z.infer<typeof UpdateAlumnoSchema>;

export type ReturnType =
  | { data: { id: number; nombre: string; apellidos: string } }
  | { error: string };
