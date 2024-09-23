import { create } from "zustand";
interface SearchType {
  searchedText: string;
  setSearchedText: (searchedText: string) => void;
}

export const useSearch = create<SearchType>((set) => ({
  searchedText: "",
  setSearchedText: (text) => {
    set((state) => ({
       searchedText: text,
    }));
  },
}));
