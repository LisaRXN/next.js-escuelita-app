// actions/admin/toggle-volunteer-active/types.ts
import { z } from "zod";
import { ToggleAdminSchema } from "./schema";

export type InputType = z.infer<typeof ToggleAdminSchema>;

export type ReturnType =
  | { data: { volunteerId: number; isAdmin: boolean } }
  | { error: string };
