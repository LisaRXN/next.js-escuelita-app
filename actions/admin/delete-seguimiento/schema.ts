import { z } from "zod";

export const DeleteSeguimientoSchema = z.object({
  id: z.coerce.number().int().positive(),
});
