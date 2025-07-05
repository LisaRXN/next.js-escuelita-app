// actions/admin/toggle-volunteer-active/schema.ts
import { z } from "zod";

export const ToggleVolunteerActiveSchema = z.object({
  volunteerId: z.number(),
  isActive: z.boolean(),
});