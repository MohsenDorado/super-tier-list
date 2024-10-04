import { create } from 'zustand';

// Define the interface for the state
interface CardStoreState {
  selectedCardId: string | null; // `null` if no card is selected
  setSelectedCardId: (id: string) => void; // Function to set the selected card ID
  scrollPosition: number; // Store the scroll position
  setScrollPosition: (position: number) => void; // Function to set the scroll position
}

// Zustand store with typed state
export const useCardStore = create<CardStoreState>((set) => ({
  selectedCardId: null, // Initial value for selectedCardId
  setSelectedCardId: (id: string) => set({ selectedCardId: id }), // Setter function
  
  scrollPosition: 0, // Initial value for scrollPosition
  setScrollPosition: (position: number) => set({ scrollPosition: position }), // Setter function
}));
