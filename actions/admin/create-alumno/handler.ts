"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/is-admin";
import { InputType, ReturnType } from "./types";
import { Sexo, Escuelita, EstatusInscripcion } from "@/generated/prisma";

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = await auth();

  if (!userId) return { error: "Unauthorized" };

  const isUserAdmin = await isAdmin(userId);
  if (!isUserAdmin) return { error: "Unauthorized" };

  const { apellidos, nombre, fechaNacimiento, sexo, dni, colegio, nivel, fechaMatricula, escuelita, necesidadesEspeciales, estatusInscripcion, autorizacionImagen } = data;

  try {
    const alumno = await prisma.alumno.create({
      data: {
        apellidos,
        nombre,
        fechaNacimiento: new Date(fechaNacimiento),
        sexo: sexo as Sexo,
        dni,
        colegio,
        nivel,
        fechaMatricula: new Date(fechaMatricula),
        escuelita: escuelita as Escuelita,
        necesidadesEspeciales,
        estatusInscripcion: estatusInscripcion as EstatusInscripcion,
        autorizacionImagen: autorizacionImagen ?? false,
      },
    });

    return { data: { id: alumno.id, nombre: alumno.nombre, apellidos: alumno.apellidos } };
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && (error as { code: string }).code === "P2002") {
      return { error: "Ya existe un alumno con este DNI" };
    }
    console.error("Error creating alumno:", error);
    return { error: "Error al crear el alumno" };
  }
};
