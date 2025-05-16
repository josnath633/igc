// app/api/user/upsert/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // assure-toi que ce chemin est bon

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ success: false, error: 'Email invalide' }, { status: 400 });
    }

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: { email },
      });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Erreur serveur :", error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
