import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use router from next/navigation
import { useCardStore } from '@/store/teststore';

interface Card {
  id: number;
  title: string;
  content: string;
}

const Test = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const { selectedCardId, setSelectedCardId } = useCardStore(); // Zustand store
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({}); // To store card references
  const router = useRouter(); // Use router from next/navigation

  // Fetch data (replace with actual API or data-fetching logic)
  useEffect(() => {
    const fetchData = async () => {
      const data = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        title: `Card Title ${i}`,
        content: `This is the content for card ${i}`,
      }));
      setCards(data);
    };
    fetchData();
  }, []);

  // Scroll to the selected card by ID
  useEffect(() => {
    if (selectedCardId && cardRefs.current[selectedCardId]) {
      cardRefs.current[selectedCardId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedCardId]);

  // Handle card link click (scroll to card)
  const handleLinkClick = (id: string) => {
    setSelectedCardId(id); // Set the selected card ID, triggering scroll
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          ref={(el) => {
            cardRefs.current[card.id] = el; // Store reference for each card
          }}
          className={`border-2 p-4 h-[200px] cursor-pointer ${
            selectedCardId === card.id.toString()
              ? 'border-4 border-blue-500' // Thicker border for selected card
              : 'border-gray-300'
          }`}
        >
          <h3 className="text-lg font-bold">{card.title}</h3>
          <p>{card.content}</p>

          {/* Link to scroll to another card */}
          {cards.map((otherCard) =>
            otherCard.id !== card.id&&otherCard.id%10==0 ? (
              <button
                key={otherCard.id}
                className="text-blue-500 underline mt-2"
                onClick={() => handleLinkClick(otherCard.id.toString())}
              >
                Go to {otherCard.title}
              </button>
            ) : null
          )}
        </div>
      ))}
    </div>
  );
};

export default Test;
