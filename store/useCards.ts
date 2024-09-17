import { Card } from "@prisma/client";
import { create } from "zustand";
type useCardsType = {
  sortedCards: Card[];
  setSortedCards: (sortedCards: Card[]) => void;
  filteredCards: Card[];
  setFilteredCards: (filteredCards: Card[]) => void;
};
export const useCards = create<useCardsType>((set) => ({
  sortedCards: [],
  setSortedCards: (sortedCards: Card[]) => set({ sortedCards }),
  filteredCards: [],
  setFilteredCards: (filteredCards: Card[]) => set({ filteredCards }),
}));
