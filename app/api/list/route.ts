import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma';

export async function GET() {
  const cards = await prisma.card.findMany()
  return NextResponse.json(cards);
}



export async function POST(request: Request) {
  const { person, amount } = await request.json();
  const newCard = await prisma.card.create({
    data: {
      person,amount
    },
  });
  return NextResponse.json(newCard);
}
