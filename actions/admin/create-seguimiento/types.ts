import { z } from "zod";
import { CreateSeguimientoSchema } from "./schema";

export type InputType = z.infer<typeof CreateSeguimientoSchema>;
export type ReturnType = { data: { id: number } } | { error: string };
