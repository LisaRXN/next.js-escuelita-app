"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { Escuelita, Calificacion } from "@/generated/prisma";

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  try {
    const seguimiento = await prisma.seguimiento.create({
      data: {
        fechaSesion: new Date(data.fechaSesion),
        escuelita: data.escuelita as Escuelita,
        alumnoId: data.alumnoId,
        tema: data.tema,
        calificacion: data.calificacion as Calificacion,
        dificultad: data.dificultad,
        observacion: data.observacion,
      },
    });
    return { data: { id: seguimiento.id } };
  } catch (error) {
    console.error("Error creating seguimiento:", error);
    return { error: "Error al crear el seguimiento" };
  }
};
