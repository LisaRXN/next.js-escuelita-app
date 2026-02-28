'use server';

import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateProfileSchema } from "./schema";
import { handler } from "./handler";

export const updateProfile = createSafeAction(UpdateProfileSchema, handler);
