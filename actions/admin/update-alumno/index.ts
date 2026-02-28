'use server';

import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateAlumnoSchema } from "./schema";
import { handler } from "./handler";

export const updateAlumno = createSafeAction(UpdateAlumnoSchema, handler);
