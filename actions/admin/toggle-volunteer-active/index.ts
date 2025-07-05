import { createSafeAction } from "@/lib/create-safe-action";
import { ToggleVolunteerActiveSchema } from "./schema";
import { handler } from "./handler";

export const toggleVolunteerActive = createSafeAction(
    ToggleVolunteerActiveSchema,
    handler
  );