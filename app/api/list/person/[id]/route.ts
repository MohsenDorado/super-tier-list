import client from '@/app/lib/prismadb';
import { Card } from '@prisma/client';
import { NextResponse } from 'next/server';

// Existing GET method to fetch a card by ID
// New GET method to fetch all cards with the same "person" property, excluding the given ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const numberedId = Number(params.id);
  
  // Find the card by ID to get the person
  const data = await client.card.findUnique({
    where: { id: numberedId },
  });

  if (!data) {
    return NextResponse.json({ message: 'No Other' }, { status: 404 });
  }

  // Fetch all other cards with the same "person" property, excluding the current card
  const relatedCards = await client.card.findMany({
    where: {
      person: data.person, // Match cards with the same "person"
      id: { not: numberedId }, // Exclude the current card from the result
    },
  });

  // Return the related cards
  return NextResponse.json(relatedCards); // Return only the related cards
}
