import { z } from "zod";

export const UpdateSessionSchema = z.object({
  sessionId: z.number().min(1),
  title: z.string().min(1),
  capacity: z.number().min(1),
  description: z.string(),
  location: z.string(),
  date: z.string().refine(dateStr => !isNaN(Date.parse(dateStr)), {
    message: "Date invalide",
  }),
});