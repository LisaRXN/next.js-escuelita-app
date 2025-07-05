import { z } from "zod";

export const ToggleVolunteerStatusSchema = z.object({
  registrationId: z.number(),
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "NO_SHOW"]),
});