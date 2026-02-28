import { z } from "zod";
import { DeleteSeguimientoSchema } from "./schema";

export type InputType = z.infer<typeof DeleteSeguimientoSchema>;
export type ReturnType = { data: { id: number } } | { error: string };
