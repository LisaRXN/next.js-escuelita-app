"use server"

import { createSafeAction } from "@/lib/create-safe-action";
import { GetSessionSchema } from "./schema";
import { handler } from "./handler";

export const getSession = createSafeAction(GetSessionSchema, handler);
