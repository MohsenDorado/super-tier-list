"use client";
import React from "react";
//,{notSelected}:{notSelected:boolean}
type CardInfoProps =
    | { isSelected: true; id: string }  // When isSelected is true, id is required
    | { isSelected: false; id?: string }; // When isSelected is false, id is optional
  

const CardInfo: React.FC<CardInfoProps> = ({ isSelected, id }) => {
  return (
    <div className="sticky top-[70px]">
      {!isSelected ? (
        <div>Not selected dude</div>
      ) : (
        <div className="">CardInfo of{id}</div>
      )}
    </div>
  );
};

export default CardInfo;
