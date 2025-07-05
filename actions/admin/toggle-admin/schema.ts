// actions/admin/toggle-volunteer-active/schema.ts
import { z } from "zod";

export const ToggleAdminSchema = z.object({
  volunteerId: z.number(),
  isAdmin: z.boolean(),
});