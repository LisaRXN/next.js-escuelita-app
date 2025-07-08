import { z } from "zod";

export const CreateSessionSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, {
      message: "Title is too short",
    }),
  description: z.string(),
  location: z.string(),
  capacity: z.number().min(1),
  image: z.string().min(1),
  date: z.string().refine((dateStr) => !isNaN(Date.parse(dateStr)), {
    message: "Date invalide",
  }),
});
