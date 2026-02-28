import { z } from "zod";
import { UpdateSeguimientoSchema } from "./schema";

export type InputType = z.infer<typeof UpdateSeguimientoSchema>;
export type ReturnType = { data: { id: number } } | { error: string };
