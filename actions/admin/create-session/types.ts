import { z } from "zod";
import { CreateSessionSchema } from "./schema";
import { SessionTypes } from "@prisma/client";

export type InputType = z.infer<typeof CreateSessionSchema>;

export type ReturnType =
  | {
      data: {
        title: string;
        date: string;
        description: string;
        location: string;
        capacity: number;
        image: string;
        type: SessionTypes;
        volunteers: string[];
      };
    }
  | { error: string };
