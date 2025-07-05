import { z } from "zod";
import { CreateVolunteerSchema } from "./schema";

export type InputType = z.infer<typeof CreateVolunteerSchema>;

export type ReturnType =
  | {
      data: {
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        instagram: string | null,
        birthDate: string,
      };
    }
  | { error: string };
