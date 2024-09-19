import client from '@/app/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET() {
  const count = await client?.card?.count();  // Add this line to get the count of all cards

  const cards = await client.card.findMany()
  return NextResponse.json({ cards, count });
}



export async function POST(request: Request) {
  const { person, amount } = await request.json();
  const newCard = await client.card.create({
    data: {
      person,amount
    },
  });
  return NextResponse.json(newCard);
}


export async function PUT(request: Request, { params }: { params: { id: number } }) {
  const { person, amount } = await request.json();
  const updatedPost = await client.card.update({
    where: { id: params.id },
    data: { person, amount },
  });
  return NextResponse.json(updatedPost);
}
