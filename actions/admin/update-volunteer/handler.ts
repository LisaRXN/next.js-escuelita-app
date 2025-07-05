import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";


export const handler = async (data: InputType): Promise<ReturnType> => {
  
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  const email = user?.emailAddresses[0]?.emailAddress;
  const { firstName, lastName, phone, instagram, birthDate } = data;

  try {
    const volunteer = await prisma.volunteer.update({
      where: { clerkUserId: userId },
      data: {
        firstName,
        lastName,
        phone,
        instagram,
        email,
        birthDate: new Date(birthDate),
      },
    });

    return {
      data: {
        firstName: volunteer.firstName,
        lastName: volunteer.lastName,
        phone: volunteer.phone,
        instagram: volunteer.instagram ?? "",
        birthDate: volunteer.birthDate!.toISOString(),
      },
    };
  } catch (error) {
    console.error("Error updating volunteer:", error);
    await prisma.$disconnect(); 
    return { error: "Failed to update volunteer" };
  }
};

