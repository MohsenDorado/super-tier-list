// stores/scrollStore.ts
import { create } from 'zustand';

interface ScrollType {
  scrollPosition: number;
  setScrollPosition: (position: number) => void;
}

export const useScrolling = create<ScrollType>((set) => ({
  scrollPosition: 0,
  setScrollPosition: (position) => set({ scrollPosition: position }),
}));
