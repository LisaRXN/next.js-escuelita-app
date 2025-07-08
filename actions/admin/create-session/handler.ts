"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/is-admin";

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = await auth();

  console.log("userId Create Session", userId);

  if (!userId) {
    return { error: "Unauthorized" };
  }
  
  const isUserAdmin = await isAdmin(userId);

  if (!isUserAdmin) {
    return { error: "Unauthorized" };
  }

  const { title, date, description, location, image, capacity } = data;

  try {
    const session = await prisma.volunteerSession.create({
      data: {
        title,
        date: new Date(date),
        location,
        description,
        capacity,
        image,
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
        image: session.image,
        volunteers: [],
      },
    };
  } catch (error) {
    console.error("Error creating session:", error);
    console.error("Full error details:", JSON.stringify(error, null, 2));
    await prisma.$disconnect();
    return { error: "Failed to create session" };
  }
};
