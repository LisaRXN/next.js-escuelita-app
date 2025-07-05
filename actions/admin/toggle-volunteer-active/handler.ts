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

  const { volunteerId, isActive } = data;

  try {
    const updated = await prisma.volunteer.update({
      where: { id: volunteerId },
      data: { isActive },
    });

    // Invalide les paths si nécessaire
    revalidatePath("/admin/volunteers");
    
    return { data: { volunteerId: updated.id, isActive: updated.isActive ?? false } };
  } catch (error) {
    console.error("Erreur toggle active:", error);
    await prisma.$disconnect();
    return { error: "Échec de la mise à jour" };
  }
};


