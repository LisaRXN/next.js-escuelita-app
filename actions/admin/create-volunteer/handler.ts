import { prisma } from "@/lib/prisma";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/is-admin";

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  const isUserAdmin = await isAdmin(userId);

  if (!isUserAdmin) {
    return { error: "Unauthorized" };
  }

  try {
    const { firstName, lastName, email, phone, instagram, birthDate } = data;
    const volunteer = await prisma.volunteer.create({
      data: {
        clerkUserId: userId,
        firstName,
        lastName,
        phone,
        instagram,
        email,
        birthDate: new Date(birthDate),
        createdAt: new Date(),
      },
    });

    return {
      data: {
        firstName: volunteer.firstName,
        lastName: volunteer.lastName,
        email: volunteer.email,
        phone: volunteer.phone,
        instagram: volunteer.instagram ?? "",
        birthDate: volunteer.birthDate!.toISOString(),
      },
    };
  } catch (error) {
    console.error("Error creating volunteer:", error);
    await prisma.$disconnect();
    return { error: "Failed to create volunteer" };
  }
};
