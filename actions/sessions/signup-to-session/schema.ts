import { z } from "zod";

export const SignUpToSessionSchema = z.object({
  sessionId: z.number().min(1),
});