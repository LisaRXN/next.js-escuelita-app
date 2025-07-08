
"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { CreateVolunteerSchema } from "./schema";
import { handler } from "./handler";

export const createVolunteer = createSafeAction(CreateVolunteerSchema, handler);
