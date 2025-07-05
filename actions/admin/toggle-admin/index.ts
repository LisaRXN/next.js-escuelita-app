import { createSafeAction } from "@/lib/create-safe-action";
import { ToggleAdminSchema } from "./schema";
import { handler } from "./handler";

export const toggleAdmin = createSafeAction(
    ToggleAdminSchema,
    handler
  );
  