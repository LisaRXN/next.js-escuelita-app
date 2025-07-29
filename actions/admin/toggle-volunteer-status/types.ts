// actions/admin/toggle-volunteer-active/types.ts
import { z } from "zod";
import { ToggleVolunteerStatusSchema } from "./schema";
import { RegistrationStatus } from "@prisma/client"

export type InputType = z.infer<typeof ToggleVolunteerStatusSchema>;

export type ReturnType =
  | { data: { registrationId: number; status: RegistrationStatus } }
  | { error: string };
