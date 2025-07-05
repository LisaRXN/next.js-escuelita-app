import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await prisma.volunteerSession.create({
      data: {
        title: 'Nettoyage de plage 🌊',
        date: new Date('2025-06-15T08:00:00'),
        description: 'Rejoignez-nous pour nettoyer la plage et protéger l’environnement !',
        capacity: 10,
      },
    });

    return NextResponse.json({ success: true, session });
  } catch (error) {
    console.error('Erreur lors de la création de la session', error);
    return NextResponse.json({ success: false, error });
  }
}
