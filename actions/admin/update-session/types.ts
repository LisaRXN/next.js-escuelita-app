import { z } from "zod";
import { UpdateSessionSchema } from "./schema";

export type InputType = z.infer<typeof UpdateSessionSchema>;

export type ReturnType =
  | {
      data: {
        sessionId: number;
        title?: string | undefined;
        capacity?: number | undefined;
        location?: string | undefined;
        image?: string | undefined;
        date?: string | undefined;
        description?: string | undefined;
      };
    }
  | { error: string };
