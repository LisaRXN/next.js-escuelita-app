// actions/admin/toggle-volunteer-active/types.ts
import { z } from "zod";
import { ToggleVolunteerActiveSchema } from "./schema";

export type InputType = z.infer<typeof ToggleVolunteerActiveSchema>;

export type ReturnType =
  | { data: { volunteerId: number; isActive: boolean } }
  | { error: string };
