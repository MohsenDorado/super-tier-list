import { SortCategoriesType } from "@/app/types/card-type";
import { create } from "zustand";

interface SortOrderState {
  sortOrder: "asc" | "desc";
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setSortOrder: (order: "asc" | "desc") => void;
  sortCategory:SortCategoriesType;
  setSortCategory: (sortCategory: SortCategoriesType) => void;
  orderName:string;
  setOrderName:(orderName:string)=>void;
}

export const useOrder = create<SortOrderState>((set) => ({
  orderName:"قدیمی‌ترین",
  setOrderName:(orderName:string)=>{
    set((state)=>({
      orderName:orderName
    }))
  },
  sortOrder: "asc",
  loading: false,
  sortCategory: "createdAt",
  setSortCategory: (sortCategory: SortCategoriesType) => {
    set((state) => ({
      sortCategory: sortCategory,
    }));
  },

  setSortOrder: (order: "asc" | "desc") => {
    set({ loading: true }); // Set loading to true before changing the sort order

    set((state) => ({
      sortOrder: order,

      loading: false, // Reset loading state after the change
    }));
  },
  setLoading: (loading) => set({ loading }),
}));
