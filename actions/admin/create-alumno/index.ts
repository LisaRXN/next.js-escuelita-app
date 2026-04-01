'use server';

import { createSafeAction } from "@/lib/create-safe-action";
import { handler } from "./handler";
import { CreateAlumnoSchema } from "./schema";

export const createAlumno = createSafeAction(CreateAlumnoSchema, handler);
