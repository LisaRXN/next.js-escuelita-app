"use server"

import { createSafeAction } from "@/lib/create-safe-action";
import { UnregiterSchema } from "./schema";
import { handler } from "./handler";

export const unregisterVolunteer = createSafeAction(UnregiterSchema, handler);
