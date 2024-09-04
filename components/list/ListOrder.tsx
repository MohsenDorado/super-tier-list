"use client";
import { useOrder } from "@/store/useOrder";
import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "./Modal";

const ListOrder: React.FC = () => {
  const modalRef = useRef<HTMLDivElement>(null);

  const { sortOrder, toggleSortOrder, loading, setSortOrder } = useOrder();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOrderBy = () => {
   setIsOpen(!isOpen)
  };
  //!clicks outside of opened modal, but exclude 60px top..............................
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current) {
          const rect = modalRef.current.getBoundingClientRect();
          const bufferTop = 60; // 60 pixels buffer area above the modal
      
          // Check if the click is within the modal or the buffer area above it
          const clickedInsideBufferArea =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top - bufferTop &&
            event.clientY <= rect.bottom;
      
          if (!clickedInsideBufferArea) {
            setIsOpen(false); // Close the modal if click is outside this area
          }
        }
      };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);
  

  return (
    <div className="w-full bg-transparent flex items-center justify-center gap-x-4 flex-row font-vazir">
      <button
        className="rounded-full px-4 py-2 bg-transparent border bg-black flex items-center justify-center relative h-[50px]"
        onClick={handleOrderBy}
      >
        {sortOrder === "asc" ? "قدیمی ترین" : "جدیدترین"}
        {loading ? (
          <div className="  loader p-[2px] m-[2px] bg-black dark:bg-white"></div>
        ) : (
          <ChevronRight
            className={`transition-all duration-200 ${isOpen && "rotate-90"}`}
          />
        )}

        {isOpen && (
          <div
            ref={modalRef}
            className="z-50 absolute w-full bg-gray-500 top-0 translate-y-[50px] flex flex-col"
          >
            <button
              onClick={() => {
                sortOrder === "desc" ? setIsOpen(false) : setSortOrder("desc");
                setIsOpen(false); // Close the modal after clicking
              }}
              className="px-4 py-2 bg-transparent border bg-black hover:brightness-90"
            >
              جدیدترین
            </button>

            <button
              onClick={() => {
                sortOrder === "asc" ? setIsOpen(false) : setSortOrder("asc");
                setIsOpen(false); // Close the modal after clicking
              }}
              className="px-4 py-2 bg-transparent border bg-black hover:brightness-90"
            >
              قدیمی ترین
            </button>
          </div>
        )}
      </button>
    </div>
  );
};

export default ListOrder;
