import { z } from "zod";

export const DeleteAlumnoSchema = z.object({
  id: z.coerce.number().int().positive(),
});
