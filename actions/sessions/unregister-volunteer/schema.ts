import { z } from "zod";

export const UnregiterSchema = z.object({
  sessionId: z.number().min(1),
  clerkUserId: z.string(),
});