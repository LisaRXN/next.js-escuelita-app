import { z } from "zod";

export const GetSessionSchema = z.object({
  sessionId: z.number().min(1),
});