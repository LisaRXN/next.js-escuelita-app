
'use server';

import { createSafeAction } from "@/lib/create-safe-action";
import { CreateSessionSchema } from "./schema";
import { handler } from "./handler";

export const createSession = createSafeAction(CreateSessionSchema, handler);
