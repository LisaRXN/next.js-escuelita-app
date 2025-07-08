"use server"

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { isAdmin } from "@/lib/is-admin";

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  const authorized = await isAdmin(userId);
  if (!authorized) return { error: "Unauthorized" };

  const { sessionId, title, date, description, location, capacity, image } =
    data;

  const updateData: Record<string, unknown> = {};
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (location !== undefined) updateData.location = location;
  if (capacity !== undefined) updateData.capacity = capacity;
  if (image !== undefined) updateData.image = image;
  if (date !== undefined) updateData.date = new Date(date);

  try {
    const session = await prisma.volunteerSession.update({
      where: { id: sessionId },
      data: updateData,
    });

    return {
      data: {
        sessionId: session.id,
        title: session.title,
        date: session.date.toISOString(),
        location: session.location ?? "",
        image: session.image ?? "",
        description: session.description ?? "",
        capacity: session.capacity,
      },
    };
  } catch (error) {
    console.error("Error updating session:", error);
    await prisma.$disconnect();
    return { error: "Failed to update session" };
  }
};
