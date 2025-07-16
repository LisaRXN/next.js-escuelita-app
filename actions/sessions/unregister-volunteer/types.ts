import { z } from "zod";
import { UnregiterSchema } from "./schema";

export interface RegisteredVolunteers {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
}

export type InputType = z.infer<typeof UnregiterSchema>;

export type ReturnType =
  | {
      data: {
        sessionId: number;
        firstName: string;
      };
    }
  | { error: string };
