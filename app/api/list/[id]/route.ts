import client from '@/app/lib/prismadb';
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