"use client";
import { useOrder } from "@/store/useOrder";
import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "./Modal";

const ListOrder: React.FC = () => {
  const modalRef = useRef<HTMLDivElement>(null);

  const { sortOrder, loading, setSortOrder } = useOrder();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //!clicks outside of opened modal, but exclude 60px top..............................
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current) {
        const rect = modalRef.current.getBoundingClientRect();
        const bufferTop = 65; // 60 pixels buffer area above the modal

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
  }, [isOpen]);

  return (
    <div className="w-full bg-transparent flex items-center justify-center gap-x-4 flex-row font-vazir">
      <button
        disabled={loading}
        className="rounded-lg border  px-4 py-2 bg-transparent  bg-black flex items-center justify-center gap-1 relative h-[50px]"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {sortOrder === "asc" ? "قدیمی‌ترین" : "جدیدترین"}
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
            className="z-50 cursor-default bg-slate-200 dark:bg-slate-900 rounded-xl absolute w-full my-3 py-1  top-0 translate-y-[50px]  flex-col   flex items-center justify-center gap-5"
          >
            <button
              onClick={() => {
                sortOrder === "desc" ? setIsOpen(false) : setSortOrder("desc");
                setIsOpen(false); // Close the modal after clicking
              }}
              className="px-4 py-2  w-full  mx-4  flex  items-center  justify-end hover:brightness-90 text-sm font-light dark:sm:hover:bg-slate-800 "
            >
              جدیدترین
              <input 
              checked={sortOrder==="desc"}
              className="rounded-full m-2" type="checkbox" />
            </button>

            <button
              onClick={() => {
                sortOrder === "asc" ? setIsOpen(false) : setSortOrder("asc");
                setIsOpen(false); // Close the modal after clicking
              }}
              className="px-4 py-2 w-full  items-center  mx-3 justify-end flex  hover:brightness-90 text-sm font-light dark:sm:hover:bg-slate-800"
            >
              قدیمی ترین
              <input
                            checked={sortOrder==="asc"}

              className="rounded-full m-2" type="checkbox" />
            </button>
          </div>
        )}
      </button>
      
    </div>
  );
};

export default ListOrder;
