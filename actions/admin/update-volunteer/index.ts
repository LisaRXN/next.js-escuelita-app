
'use server';

import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateVolunteerSchema } from "./schema";
import { handler } from "./handler";

export const updateVolunteer = createSafeAction(UpdateVolunteerSchema, handler);
