"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { isAdmin as checkIsAdmin } from "@/lib/is-admin";

export const handler = async (
  { volunteerId, isAdmin } : InputType
): Promise<ReturnType> => {
  const { userId } = await auth();
  if (!userId) return { error: "Non autorisé" };

  const authorized = await checkIsAdmin(userId);
  if (!authorized) return { error: "Non autorisé" };

  try {
    const updated = await prisma.volunteer.update({
      where: { id: volunteerId },
      data: { isAdmin },
    });

    // Invalide les paths si nécessaire
    revalidatePath("/admin/volunteers");

    return { data: { volunteerId: updated.id, isAdmin: updated.isAdmin ?? false } };
  } catch (error) {
    console.error("Erreur toggle active:", error);
    return { error: "Échec de la mise à jour" };
  }
};


