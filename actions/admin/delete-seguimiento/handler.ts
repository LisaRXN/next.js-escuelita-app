"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/is-admin";
import { InputType, ReturnType } from "./types";

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };
  const isUserAdmin = await isAdmin(userId);
  if (!isUserAdmin) return { error: "Unauthorized" };

  try {
    await prisma.seguimiento.delete({ where: { id: data.id } });
    return { data: { id: data.id } };
  } catch (error) {
    console.error("Error deleting seguimiento:", error);
    return { error: "Error al eliminar el seguimiento" };
  }
};
