"use client";
import { CardType } from "@/app/types/card-type";
import { Card } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
//,{notSelected}:{notSelected:boolean}
type CardInfoProps =
    | { isSelected: true; id: string }  // When isSelected is true, id is required
    | { isSelected: false; id?: string }; // When isSelected is false, id is optional
  

const CardInfo: React.FC<CardInfoProps> = ({ isSelected, id }) => {
    const { isLoading, error, data } = useQuery<Card>({
        queryKey: ["listData"],
        queryFn: () => fetch(`/api/list/${id}`).then((res) => res.json()),
      });  return (
    <div className="sticky top-[70px]">
      {!isSelected ? (
        <div>Not selected dude</div>
      ) : (
        <div className="">CardInfo of{id}
        {data?.person}
        </div>
      )}
    </div>
  );
};

export default CardInfo;
