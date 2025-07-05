import { z } from "zod";
import { CreateSessionSchema } from "./schema";

export type InputType = z.infer<typeof CreateSessionSchema>;

export type ReturnType =
  | {
      data: {
        title: string;
        date: string;
        description: string;
        location: string;
        capacity: number;
        volunteers: string[];
      };
    }
  | { error: string };
