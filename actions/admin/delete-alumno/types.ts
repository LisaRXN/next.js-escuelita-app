import { z } from "zod";
import { DeleteAlumnoSchema } from "./schema";

export type InputType = z.infer<typeof DeleteAlumnoSchema>;

export type ReturnType =
  | { data: { id: number } }
  | { error: string };
