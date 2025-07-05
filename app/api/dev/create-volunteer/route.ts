import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse('Unauthorized', { status: 401 });

    const existingVolunteer = await prisma.volunteer.findUnique({
      where: { clerkUserId: userId },
    });

    if (existingVolunteer) {
      return NextResponse.json({ message: 'Volunteer already exists' }, { status: 200 });
    }

    await prisma.volunteer.create({
      data: { clerkUserId: userId },
    });

    return NextResponse.json({ message: 'Volunteer created' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}


// import { prisma } from '@/lib/prisma';
// import { auth } from '@clerk/nextjs/server';
// import { NextResponse } from 'next/server';

// export async function POST() {
//   const { userId } = await auth();
//   if (!userId) return new NextResponse('Unauthorized', { status: 401 });

//   // Vérifier si le volontaire existe déjà
//   const existingVolunteer = await prisma.volunteer.findUnique({
//     where: { clerkUserId: userId },
//   });

//   if (existingVolunteer) {
//     return new NextResponse('Volunteer already exists', { status: 200 });
//   }

//   // Créer le volontaire
//   try {
//     await prisma.volunteer.create({
//       data: {
//         clerkUserId: userId,
//       },
//     });
//     return new NextResponse('Volunteer created', { status: 201 });
//   } catch (error) {
//     console.log(error)
//     return new NextResponse('Error creating volunteer', { status: 500 });
//   }
// }
