import { create } from 'zustand';
import { MutableRefObject } from 'react';

interface RefStore {
  myRef: MutableRefObject<HTMLDivElement | null> | null;
  setRef: (ref: MutableRefObject<HTMLDivElement | null>) => void;
}

export const useRefStore = create<RefStore>((set) => ({
  myRef: null,
  setRef: (ref) => set({ myRef: ref }),
}));
