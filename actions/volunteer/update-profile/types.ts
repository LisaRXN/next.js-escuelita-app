import { z } from "zod";
import { UpdateProfileSchema } from "./schema";

export type InputType = z.infer<typeof UpdateProfileSchema>;

export type ReturnType =
  | {
      data: {
        firstName: string;
        lastName: string;
        phone: string;
        instagram: string | null;
        birthDate: string;
      };
    }
  | { error: string };
