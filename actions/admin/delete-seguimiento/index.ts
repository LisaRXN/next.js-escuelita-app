'use server';
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteSeguimientoSchema } from "./schema";
import { handler } from "./handler";
export const deleteSeguimiento = createSafeAction(DeleteSeguimientoSchema, handler);
