"use server"

import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateSessionSchema } from "./schema";
import { handler } from "../update-session/handler";

export const updateSession = createSafeAction(UpdateSessionSchema, handler);
