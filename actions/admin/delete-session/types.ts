import { z } from "zod";
import { DeleteSessionSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { VolunteerSession } from "@/app/generated/prisma";

export type InputType = z.infer<typeof DeleteSessionSchema>
export type ReturnType = ActionState<InputType, VolunteerSession>