"use client";
import getCorrectDateTypeFromPrisma from "@/app/actions/getCorrectDateTypeFromPrisma";
import getDateDifference from "@/app/actions/getDateDifference";
import { getPersianNumbers } from "@/app/actions/getPersianNumbers";
import useDetalisRoutes from "@/app/hooks/useDetalisRoutes";
import { CardType } from "@/app/types/card-type";
import { Card } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DetailsComponent from "./DetailsComponent";
//,{notSelected}:{notSelected:boolean}
type CardInfoProps =
  | { isSelected: true; id: string } // When isSelected is true, id is required
  | { isSelected: false; id?: string }; // When isSelected is false, id is optional

// Custom hook for fetching data
const useCardData = (id: string | undefined, isSelected: boolean) => {
  const [cardData, setCardData] = useState<Card | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!isSelected) {
      setCardData(null);
    }
  }, [isSelected]);
  useEffect(() => {
    const fetchCardData = async () => {
      if (!isSelected) return;
      setLoading(true);
      setError(null); // Reset error state
      try {
        const response = await fetch(`/api/list/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch card data");
        }
        const data = await response.json();
        setCardData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, [id, isSelected]);

  return { cardData, loading, error };
};

const CardInfo: React.FC<CardInfoProps> = ({ isSelected, id }) => {
  const{detailsRoutes,selected}=useDetalisRoutes();
  const [selectedComponet, setSelectedComponet] = useState<"details" | "personal" | "others">("details")

  const { cardData, loading, error } = useCardData(id, isSelected);

  // Early return for loading state
  if (loading) {
    return <div>Loading...</div>;
  }
  // Early return if no card is selected
  if (!isSelected) {
    return (
      <div className="font-vazir flex items-center justify-center w-full h-[80vh]">
        کارتی انتخاب نشده است
      </div>
    );
  }
  // Early return for error state
  if (error) {
    return <div>Error: {error}</div>;
  }
  // Destructure cardData safely
  const handleChangeComponent=(selected: "details" | "personal" | "others")=>{
    setSelectedComponet(selected)
  }
  return (
    <div className="flex items-center  flex-col w-full h-full bg-white dark:bg-slate-900 px-[15px] ">
      {cardData && (
        <div className="h-full w-full">
          <div className="sticky top-0 max-lg:top-[60px] bg-white dark:bg-slate-900 flex items-center justify-between flex-col w-full text-right  ">
            <div className="flex items-center justify-center flex-row w-full">
              <Link
                className="lg:hidden flex   text-blue-500 font-vazir"
                href="/list"
              >
                <ChevronLeft className="" />
                بازگشت
              </Link>
              <div className=" w-full font-vazir py-4 text-[18px] font-medium truncate pl-5">
                {cardData.person}
              </div>
            </div>
          
          </div>
          <div className="font-vazirthin flex w-full items-center justify-end gap-2 text-[15px] pb-1 pr-2">
              {getPersianNumbers(cardData.id.toString())}
              <p>: شناسه قبض</p>
            </div>
            <div className="font-vazirthin flex w-full items-center justify-end gap-1 text-sm pr-2 pb-3 border-b">
              <p>روز پیش </p>
              {getPersianNumbers(
                getDateDifference(
                  getCorrectDateTypeFromPrisma(cardData.createdAt)
                ).toString()
              )}
            </div>
          <div className="  flex">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
            facere voluptate unde delectus voluptas non iste deleniti sapiente
            atque! Error, quis. Modi laborum cupiditate, fugiat optio magni quae
            perferendis dolores!
          </div>
          <div className="sticky top-[50px] max-lg:top-[110px] bg-white border-b ">
            <div className="flex items-center justify-center w-full text-[15px] font-vazir">
              {detailsRoutes.map((route)=>(
                <div
                className="relative  flex items-center justify-between w-full "
                key={route.selected}
                >

               <button
               onClick={()=>handleChangeComponent(route.selected)}
               className="p-3 bg-transparent w-full bg-red-500"
               >
                {route.label}
               </button>
               {
                selectedComponet===route.selected&&
               <span className="w-full h-[2px] bg-black absolute bottom-0 z-50">


</span>
              }
               
               </div>
               
              ))}
             
            </div>
          </div>
          <div className="">
           {selectedComponet==="details"&&<DetailsComponent data={cardData}/>}
           {selectedComponet==="others"&&"others"}
           {selectedComponet==="personal"&&"personals"}


          </div>
        </div>
      )}
    </div>
  );
};
export default CardInfo;
