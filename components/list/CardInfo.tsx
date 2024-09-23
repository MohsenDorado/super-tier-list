"use client";
import { CardType } from "@/app/types/card-type";
import { Card } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
  const {
    person,
    amount,
    createdAt,
    id: cardId,
    updatedAt,
    withdrawled,
  } = cardData || {};
  return (
    <div className="flex items-center  flex-col w-full h-full bg-white ">
      {cardData && (
        <div className="h-full w-full">
          <div className="sticky top-0 max-lg:top-[60px] bg-white flex items-center justify-between flex-row w-full text-right border-b ">
           <Link href="/list">
      Back
      </Link>
            <div className=" w-full font-vazir p-4">{person}</div>
          </div>
          <div className=" h-[400vh] flex">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
            facere voluptate unde delectus voluptas non iste deleniti sapiente
            atque! Error, quis. Modi laborum cupiditate, fugiat optio magni quae
            perferendis dolores!
          </div>
          <div className="sticky top-[300px] bg-black ">
            <p className="w-full">

        یتخلحمنشسث؛لححگم
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default CardInfo;
