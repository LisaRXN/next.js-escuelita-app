'use server';
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateSeguimientoSchema } from "./schema";
import { handler } from "./handler";
export const createSeguimiento = createSafeAction(CreateSeguimientoSchema, handler);
