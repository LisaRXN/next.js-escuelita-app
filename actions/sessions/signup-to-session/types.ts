import { z } from "zod";
import { SignUpToSessionSchema } from "./schema";

export interface RegisteredVolunteers {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
}

export type InputType = z.infer<typeof SignUpToSessionSchema>;

export type ReturnType =
  | {
      data: {
        sessionId: number;
        volunteerId: number;
      };
    }
  | { error: string };
