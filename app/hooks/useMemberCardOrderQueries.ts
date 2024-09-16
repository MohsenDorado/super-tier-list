import { useMemo } from "react";
import { MemberCardOrderQueriesType } from "@/app/types/card-type";


export const useMemberCardOrderQueries = () => {
    const MemberCardOrderQueries:MemberCardOrderQueriesType[] = useMemo(() => {
      return [
        { id: 0, name: "جدیدترین", order: "desc", orderCategory: "createdAt" },
        { id: 1, name: "قدیمی‌ترین", order: "asc", orderCategory: "createdAt" },
        { id: 2, name: "بیشترین بدهی", order: "desc", orderCategory: "amount" },
        { id: 3, name: "کمترین بدهی", order: "asc", orderCategory: "amount" }
        
        // more card objects...
      ];
    }, []); // No dependencies, so the array is memoized once
  
    return MemberCardOrderQueries; // Return the memoized array
  };