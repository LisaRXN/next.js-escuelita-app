"use server"

import { createSafeAction } from "@/lib/create-safe-action";
import { SignUpToSessionSchema } from "./schema";
import { handler } from "./handler";

export const signUpToSession = createSafeAction(SignUpToSessionSchema, handler);
