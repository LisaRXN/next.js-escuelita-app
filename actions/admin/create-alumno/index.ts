'use server';

import { createSafeAction } from "@/lib/create-safe-action";
import { CreateAlumnoSchema } from "./schema";
import { handler } from "./handler";

export const createAlumno = createSafeAction(CreateAlumnoSchema, handler);
