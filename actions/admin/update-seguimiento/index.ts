'use server';
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateSeguimientoSchema } from "./schema";
import { handler } from "./handler";
export const updateSeguimiento = createSafeAction(UpdateSeguimientoSchema, handler);
