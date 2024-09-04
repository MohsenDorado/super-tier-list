import { create } from 'zustand';

interface SortOrderState {
  sortOrder: 'asc' | 'desc';
  toggleSortOrder: () => void;
}

export const useOrder = create<SortOrderState>((set) => ({
  sortOrder: 'asc',
  toggleSortOrder: () =>
    set((state) => ({
      sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc',
    })),
}));
