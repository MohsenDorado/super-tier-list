"use client";
import { CardType } from "@/app/types/card-type";
import { Card } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
//,{notSelected}:{notSelected:boolean}
type CardInfoProps =
    | { isSelected: true; card: Card }  // When isSelected is true, id is required
    | { isSelected: false; card?: Card }; // When isSelected is false, id is optional
  

const CardInfo: React.FC<CardInfoProps> = ({ isSelected,card }) => {
        return (
        <div className="sticky top-[70px]">
          {!isSelected ? (
            <div>Not selected dude</div>
          ) : (
            <div className="">CardInfo of{card.id}
            {card.person}
            </div>
          )}
        </div>
      );
};

export default CardInfo;
