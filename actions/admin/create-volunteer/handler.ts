import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";


export const handler = async (data: InputType): Promise<ReturnType> => {
  
  const { userId } = await auth();
  // const user = await currentUser();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  // const email = user?.emailAddresses[0]?.emailAddress;
  const { firstName, lastName, email, phone, instagram, birthDate } = data;

  try {
    const volunteer = await prisma.volunteer.create({
      data: {
        clerkUserId:userId,
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

