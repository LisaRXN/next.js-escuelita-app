// actions/admin/toggle-volunteer-active/handler.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/is-admin";

export const handler = async (
  data: InputType
): Promise<ReturnType> => {
  const { userId } = await auth();
  if (!userId) return { error: "Non autorisé" };

  const authorized = await isAdmin(userId);
  if (!authorized) return { error: "Accès refusé" };

  const { registrationId, status } = data;

  try {
    const updated = await prisma.volunteerRegistration.update({
      where: { id: registrationId },
      data: { status },
    });

    // Invalide les paths si nécessaire
    revalidatePath("/admin/sessions");
    
    return { data: { registrationId: updated.id, status: updated.status } };
  } catch (error) {
    console.error("Erreur toggle status:", error);
    await prisma.$disconnect();
    return { error: "Erreur toggle status" };
  }
};


