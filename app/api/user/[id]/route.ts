import { prisma } from "@/lib/prisma";
import { RegistrationStatus } from "@/generated/prisma";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest,  { params }: { params: { id: string } }) {
  
  const paramsUrl = await params;

  if (!paramsUrl) {
    return new Response("Missing params", { status: 400 });
  }
  
  const userId = await paramsUrl.id;

  if (!userId) {
    return new Response("Missing userId", { status: 400 });
  }

  const user = await prisma.volunteer.findUnique({
    where: {
      clerkUserId: userId,
    },
    include: {
      registrations: {
        include: {
          session: true,
        },
        orderBy: {
          session: {
            date: "desc",
          },
        },
      },
    },
  });
  

  if (!user) {
    return new Response("User not found", { status: 404 });
  }


  const tutoringCount = await prisma.volunteerRegistration.count({
    where: {
      volunteerId: user.id,
      status: RegistrationStatus.CONFIRMED,
    },
  });


  return Response.json({
    ...user,
    tutoringCount: tutoringCount,
  });}

