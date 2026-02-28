import { z } from "zod";
import { CreateAlumnoSchema } from "./schema";

export type InputType = z.infer<typeof CreateAlumnoSchema>;

export type ReturnType =
  | { data: { id: number; nombre: string; apellidos: string } }
  | { error: string };
