import { z } from "zod";

export const DeleteSessionSchema = z.object({
  id: z.number(),
});