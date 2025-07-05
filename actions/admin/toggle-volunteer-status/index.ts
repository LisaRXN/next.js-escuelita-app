import { createSafeAction } from "@/lib/create-safe-action";
import { ToggleVolunteerStatusSchema } from "./schema";
import { handler } from "./handler";

export const toggleVolunteerStatus = createSafeAction(
  ToggleVolunteerStatusSchema,
    handler
  );