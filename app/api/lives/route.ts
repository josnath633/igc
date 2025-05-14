// app/api/lives/route.ts

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const lives = await prisma.live.findMany({
      orderBy: { startTime: 'desc' },
    })
    console.log(lives)
    return NextResponse.json(lives)
  } catch (error) {
    console.error('Erreur lors de la récupération des lives:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
