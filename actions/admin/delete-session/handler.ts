import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  const { id } = data;

  try {
    const session = await prisma.volunteerSession.delete({
      where: { id },
    });

    revalidatePath(`/admin/get-session`);

    return { data: session };
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    return { error: "Erreur lors de la suppression de la session" };
  }
};
