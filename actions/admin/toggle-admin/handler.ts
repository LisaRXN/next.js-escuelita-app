"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";

export const handler = async (
  { volunteerId, isAdmin } : InputType
): Promise<ReturnType> => {
  const { userId } = await auth();
  if (!userId) return { error: "Non autorisé" };


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
    await prisma.$disconnect();
    return { error: "Échec de la mise à jour" };
  }
};


