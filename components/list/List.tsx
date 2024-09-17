"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import Avatar from "@/public/Profile_avatar_placeholder_large.png";
import { CalendarDays, Clock, Trash } from "lucide-react";
// import DeleteButton from "./DeleteButton";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "./Modal";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import _, { identity } from "lodash";
import { useOrder } from "@/store/useOrder";
import getPersianTime from "@/app/actions/getPersianTime";
import getPersianDate from "@/app/actions/getPersianDate";
import getRandomColorByNumber from "@/app/actions/getRandomColorByNumber";
import getPricingFormat from "@/app/actions/getPricingFormat";
import getDateTypeFromPrisma from "@/app/actions/getCorrectDateTypeFromPrisma";
import getCorrectDateTypeFromPrisma from "@/app/actions/getCorrectDateTypeFromPrisma";
import { getPersianNumbers } from "@/app/actions/getPersianNumbers";
import {CardType} from "@/app/types/card-type";
import { Card } from '@prisma/client';
import { useCards } from "@/store/useCards";
import { FaSearch } from "react-icons/fa";
import ListOrder from "./ListOrder";

function List() {
  const [searchedTerm, setSearchedTerm] = useState<string>("");

  const{setSortedCards,sortedCards}=useCards();
  const [deleting, setDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery<CardType>({
    queryKey: ["listData"],
    queryFn: () => fetch("api/list").then((res) => res.json()),
  });
  //! order by the creation date ........................................
  const sortOrder = useOrder((state) => state.sortOrder);
  const sortCategory=useOrder((state)=>state.sortCategory)
  const sortedCardsByLodash:Card[] =useMemo(()=>{
  
   return _.orderBy(data?.cards, [sortCategory], [sortOrder]);
  },[data, sortCategory, sortOrder]) 
  useEffect(() => {
    setSortedCards(sortedCardsByLodash)

  }, [sortedCardsByLodash])
  
  //!The mutation for DELETE .....................................
  const deleteCard = async (id: string) => {
    const response = await fetch(`/api/list/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete card");
    }
    return response.json();
  };
  // Mutation for deleting a card
  const mutation = useMutation({
    mutationFn: deleteCard,
    onSuccess: () => {
      // Invalidate and refetch the list data to reflect the deletion
      queryClient.invalidateQueries({ queryKey: ["listData"] });
      toast.success(<strong className="font-vazir">کارت حذف شد</strong>);
    },
    onError: (error: Error) => {
      console.error("Error deleting card:", error);
    },
  });
  const handleDelete = (id: string) => {
    try {
      setDeleting(true);
      mutation.mutate(id);
      setDeletingId("");
    } catch (error) {
      setIsModalOpen(false);
    } finally {
      setDeleting(false);
    }
  };
  useEffect(() => {
    if (deleting === false && mutation.isPending === false) {
      setIsModalOpen(false);
    }
  }, [mutation.isPending]);

  useEffect(() => {
    if (deletingId) {
      setIsModalOpen(true);
    }
  }, [deletingId]);
  const handleDeleteButton = (id: string) => {
    setDeletingId(id);
    setIsModalOpen(true);
  };
  //!filter the sorted list.......................................................

  const filteredCards = useMemo(() => {
    if (!searchedTerm.trim()) {
      return sortedCards; // If the search term is empty, return all cards
    }
    return sortedCards.filter((card) =>
      card.person.toLowerCase().includes(searchedTerm.trim().toLowerCase())
    );
  }, [searchedTerm, sortedCards]);

//!returnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
  return (
    <div className="flex flex-col  dark:text-white ">
      <div className="bg-white w-full flex items-center justify-center flex-col lg:px-[17%] max-sm:px-[5%] border-b">

      <div className="flex items-center border justify-center rounded-lg  w-full  relative focus:border-slate-400 text-sm">
      <input
        type="text"
        value={searchedTerm}
        onChange={(event) => setSearchedTerm(event.target.value)}
        className="font-vazir w-full mr-[50px] ml-[25px] py-2 text-right focus:border-slate-50 focus:outline-none "
        placeholder="...جستجو"
      />
      <FaSearch className="absolute right-[20px] text-black dark:text-white" />
   
    </div>
    <div className="w-full flex items-center justify-end my-2  ">
      <div>

    <ListOrder/>
      </div>
    </div>


        {/* <div className="flex items-center justify-center flex-row w-full">
        <input type="text" value={searchedTerm} onChange={(event)=>{setSearchedTerm(event.target.value)}}
        className='w-[100%] border h-[100px] lg:mx-[17%] px-[50px] max-sm:px-[25px]'
        />

        </div> */}
    </div>
    {!isLoading&&filteredCards.length===0&&
       <div
      
       className="flex items-center justify-center w-full h-[300px]  font-vazir font-extrabold "
     >
فردی با این نام وجود ندارد
     </div>
      }
    <div className="lg:mx-[17%] px-[50px] max-sm:px-[25px] grid grid-cols-1  md:grid-cols-1 xl:grid-cols-2 gap-4  ">
     

      <Modal
        deletingTodo={mutation.isPending}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <h1 className="p-2 font-bold text-black font-vazir text-right">
          از حذف این کارت اطمینان دارید؟ <br />
          <span className=" text-sm font-medium text-slate-500">
            (این عملیات قابل بازگشت نیست)
          </span>
        </h1>
        <div className="flex items-center justify-center w-full gap-5 mt-1 px-3">
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
            className="font-semibold p-1 text-md rounded-md border-none text-white bg-green-400 w-[100px] h-[50px]"
          >
            Cancel
          </button>
          <button
            className="w-[100px] bg-red-600 group rounded-md p-2 m-3 h-[50px]"
            onClick={() => handleDelete(deletingId)}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <ClipLoader
                color="white"
                className="w-full   h-7 border-white fill-white text-white"
              />
            ) : (
              <Trash className="h-7 w-full dark:sm:group-hover:fill-white sm:group-hover:fill-black transition-all duration-100" />
            )}
          </button>
        </div>
      </Modal>
      
      {isLoading &&
        Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl shadow-md bg-slate-50 dark:bg-slate-800 transition-all duration-200 flex
       items-center justify-center flex-col p-4 my-3 font-vazir w-full"
          >
            <div className=" flex items-center justify-between  w-full">
              <p className="text-right right-0 mx-3 w-full md:text-xl font-bold h-[50%] animate-pulse rounded-xl bg-slate-200   "></p>
              <div className="relative w-16 h-16 max-sm:w-10 max-sm:h-10 rounded-full overflow-hidden flex-shrink-0   ">
                <div
                  className={`absolute w-full h-full animate-pulse bg-slate-200  `}
                ></div>
              </div>
            </div>
            {/* //!بدهی */}
            <div className="flex items-center justify-end w-full ">
              <div className="font-vazir  text-xl my-10  w-full h-full">
                <div className="flex items-center justify-end gap-5 max-sm:text-lg w-full h-full ">
                  <p className="w-[200px] h-5 bg-slate-200 animate-pulse rounded-xl right-0"></p>
                  <p></p>
                </div>
              </div>
            </div>
            {/* //! : تسویه */}
            <div className="flex items-center justify-end w-full ">
              <div className="font-vazir  text-xl   w-full h-full">
                <div className="flex items-center justify-end gap-5 max-sm:text-lg w-full h-full ">
                  <p className="w-[200px] h-5 bg-slate-200 animate-pulse rounded-xl right-0"></p>
                  <p></p>
                </div>
              </div>
            </div>
            {/* //!تاریخ ها */}
            <div className="flex items-center justify-between w-full h-[100px] mt-10 gap-2">
              <div className="animate-pulse w-full h-full bg-slate-200 rounded-xl"></div>
              <div className="animate-pulse w-full h-full bg-slate-200 rounded-xl"></div>
            </div>
          </div>
        ))}
      {/* //!The data map..................... */}
     

      <AnimatePresence>
        
        {filteredCards.map((item) => (
          <motion.div
            initial={{ opacity: 0, scale:0 }}
            animate={{ opacity: 1, y: 0,scale:1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.4, ease:"circInOut" }}
            key={item.id}
            className="rounded-xl shadow-md bg-slate-50 sm:hover:brightness-90 dark:bg-slate-800 transition-all duration-100 flex
         items-center justify-center flex-col p-4 my-3 font-vazir w-full"
          >
            {/* //!Top of card */}
            {/* //!اسم و عکس */}
            <div className=" flex items-center justify-between  w-full">
              <p className="text-right mx-3 w-full md:text-xl font-bold    ">
                {item.person}
              </p>
              <div className="relative w-16 h-16 max-sm:w-10 max-sm:h-10 rounded-full overflow-hidden flex-shrink-0   ">
                <div
                  style={{ backgroundColor: getRandomColorByNumber(item.id) }}
                  className={`absolute w-full h-full  `}
                ></div>
                <Image
                  src={Avatar}
                  alt="user-image"
                  className=" opacity-60  "
                />
              </div>
            </div>
            {/* //!بدهی */}
            <div className="flex items-center justify-end w-full">
              <div className="font-vazir  text-xl mt-10">
                <div className="flex items-center justify-center gap-5 max-sm:text-lg">
                  <p>
                    {getPersianNumbers(
                      getPricingFormat(item.amount.toString())
                    )}
                  </p>
                  <p> : قابل پرداخت</p>
                </div>
              </div>
            </div>
            {/* //!وضعیت پرداخت  */}
            <div className="flex items-center justify-end w-full my-10">
              <div className="font-vazir  text-xl">
                <div className="flex items-center justify-center gap-5 max-sm:text-lg">
                  <div>
                    {item.withdrawled ? (
                      <p className="text-green-600">تسویه شده</p>
                    ) : (
                      <p className="text-red-600">تسویه نشده</p>
                    )}
                  </div>
                  <p> : وضعیت پرداخت</p>
                </div>
              </div>
            </div>
            {/* //! : تاریخ  */}
            <div className="flex items-center justify-between w-full">
              {/* //!اتمام مهلت */}
              <div className="font-vazir  text-xl  w-full flex items-center justify-center   ">
                <div className="flex items-center justify-center flex-col gap-2 max-sm:text-xs  w-full">
                  <p className=" w-full max-sm:text-sm  text-center text-lg max-sm:text-[1rem]">
                    اتمام مهلت
                  </p>
                  <div className=" flex flex-col gap-2 text-right  w-full ">
                    <div className=" max-sm:text-sm text-lg text-slate-600 dark:text-slate-400  w-full text-right items-center justify-start gap-1 flex  ">
                      <CalendarDays className="right-0 w-6 h-6" />
                      <p>
                        {getPersianDate(getDateTypeFromPrisma(item.createdAt), true)}
                      </p>
                    </div>
                    <div className=" text-lg max-sm:text-sm text-slate-600 dark:text-slate-400 w-full text-right items-center justify-start gap-1 flex  ">
                      <Clock className="right-0 w-6 h-6" />
                      <p>{getPersianTime(getDateTypeFromPrisma(item.createdAt))}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* //!خط.............. */}
              <div className="w-[1px] h-full bg-slate-400 rounded-full mx-6 max-sm:mx-2"></div>
              {/* //!تاریخ تشکیل */}
              <div className="font-vazir  text-xl  w-full  flex items-center justify-center">
                <div className="flex items-center justify-center flex-col gap-2 max-sm:text-sm w-full">
                  <p className="max-sm:text-sm w-full text-center text-lg max-sm:text-[1rem]">
                    تاریخ تشکیل
                  </p>
                  <div className="max-sm:text-sm flex flex-col gap-2 w-full text-right">
                    <div className="max-sm:text-sm text-lg text-slate-600 dark:text-slate-400 text-right w-full items-center justify-end gap-1 flex   ">
                      <p>
                        {getPersianDate(getCorrectDateTypeFromPrisma(item.createdAt), false)}
                      </p>
                      <CalendarDays className="right-0 w-6 h-6" />
                    </div>
                    <div className="max-sm:text-sm text-lg text-slate-600 dark:text-slate-400 w-full text-right items-center justify-end gap-1 flex  ">
                      <p>{getPersianTime(getDateTypeFromPrisma(item.createdAt))}</p>
                      <Clock className="right-0 w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="w-full bg-red-600 rounded-md p-2 m-3 group"
              onClick={() => handleDeleteButton(item.id.toString())}
              disabled={mutation.isPending || isModalOpen}
            >
              <Trash className="h-7 w-full sm:dark:group-hover:fill-white sm:group-hover:fill-black transition-all duration-100" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
    </div>

  );
}
export default List;
