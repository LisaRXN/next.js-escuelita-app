"use server"

import { prisma } from "@/lib/prisma";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }
  

  try {
    const { firstName, lastName, email, phone, instagram, birthDate } = data;

    const existingVolunteer = await prisma.volunteer.findFirst({
      where: {
        OR: [
          { clerkUserId: userId },
          { email: email },
        ],
      },
    });
  
    if (existingVolunteer) {
      return { error: "Tu perfil ya esta registrado" };
    }

    console.log( "Creating volunteer with data:", {
      userId,
      firstName,
      lastName,
      email,
      phone,
      instagram,
      birthDate,
    });

    const volunteer = await prisma.volunteer.create({
      data: {
        clerkUserId: userId,
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
        email: volunteer.email,
        phone: volunteer.phone,
        instagram: volunteer.instagram ?? "",
        birthDate: volunteer.birthDate!.toISOString(),
      },
    };
  } catch (error) {
    console.error("Error creando el voluntario:", error);
    await prisma.$disconnect();
    return { error: "Error creando tu perfil" };
  }
};
