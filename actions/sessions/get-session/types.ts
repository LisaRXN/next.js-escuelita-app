import { z } from "zod";
import { GetSessionSchema } from "./schema";
import { VolunteerSession } from "@/generated/prisma";

export interface RegisteredVolunteers {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
}

export type InputType = z.infer<typeof GetSessionSchema>;

export type ReturnType =
  | {
      data: {
        session: VolunteerSession;
        registeredVolunteers: RegisteredVolunteers[];
      };
    }
  | { error: string };
