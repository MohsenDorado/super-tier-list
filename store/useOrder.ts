import { create } from 'zustand';

interface SortOrderState {
  sortOrder: 'asc' | 'desc';
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setSortOrder:(order:"asc"|"desc")=>void;
}

export const useOrder = create<SortOrderState>((set) => ({
  sortOrder: 'asc',
  loading: false,

  setSortOrder:(order:"asc"|"desc")=>{
    set({ loading: true }); // Set loading to true before changing the sort order


    setTimeout(() => {
        
        set((state)=>(
            {
                
                sortOrder:order,
            
                loading: false, // Reset loading state after the change
            }
        ))
    }, 500);


  },
  setLoading: (loading) => set({ loading }),
}));