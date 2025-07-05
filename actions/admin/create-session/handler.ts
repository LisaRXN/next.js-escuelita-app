import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  const { title, date, description, location, capacity } = data;

  try {
    const session = await prisma.volunteerSession.create({
      data: {
        title,
        date: new Date(date),
        location,
        description,
        capacity,
      },
    });

    revalidatePath(`/admin/get-session`);

    return {
      data: {
        title: session.title,
        date: session.date.toISOString(),
        description: session.description,
        location: session.location,
        capacity: session.capacity,
        volunteers: [],
      },
    };
  } catch (error) {
    console.error("Error creating session:", error);
    await prisma.$disconnect();
    return { error: "Failed to create session" };
  }
};
