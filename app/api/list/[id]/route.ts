import client from '@/app/lib/prismadb';
import { Card } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: { id: string } }) {

  const { person, amount,withdrawled } = await request.json();
  const updatedCard = await client.card.update({
    where: { id: Number(params.id) },
    data: { person, amount,withdrawled },
  });
  return NextResponse.json(updatedCard);
}

// DELETE request handler
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const deletedCard = await client.card.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json({ message: 'Card deleted', deletedCard });
}

// Get by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const numberedId = Number(params.id);
 
  const data = await client.card.findUnique({
    where: { id:numberedId },
  });

  if (!data) {
    return NextResponse.json({ message: 'Card not found' }, { status: 404 });
  }

  return NextResponse.json<Card>({
    
    id:data.id,
    amount:data.amount,
    createdAt:data.createdAt,
    person:data.person,
    updatedAt:data.updatedAt,
    withdrawled:data.withdrawled


   });
   
}
