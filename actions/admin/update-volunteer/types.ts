import { z } from "zod";
import { UpdateVolunteerSchema } from "./schema";

export type InputType = z.infer<typeof UpdateVolunteerSchema>;

export type ReturnType =
  | {
      data: {
        firstName: string | null,
        lastName: string | null,
        phone: string | null,
        instagram: string | null,
        birthDate: string | null,
      };
    }
  | { error: string };
