"use server"

import { createSafeAction } from "@/lib/create-safe-action";
import { UnregiterSchema } from "./schema";
import { handler } from "./handler";

export const unregisterToSession = createSafeAction(UnregiterSchema, handler);
