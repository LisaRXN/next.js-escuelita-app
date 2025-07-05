'use server';

import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteSessionSchema } from "./schema";
import { handler } from "./handler";

export const deleteSession = createSafeAction(DeleteSessionSchema, handler);
