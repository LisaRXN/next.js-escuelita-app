'use server';

import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteAlumnoSchema } from "./schema";
import { handler } from "./handler";

export const deleteAlumno = createSafeAction(DeleteAlumnoSchema, handler);
