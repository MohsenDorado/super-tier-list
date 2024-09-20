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
import { CardType } from "@/app/types/card-type";
import { Card } from "@prisma/client";
import { useCards } from "@/store/useCards";
import { FaSearch } from "react-icons/fa";
import ListOrder from "./ListOrder";
import Count from "./Count";
import getDateDifference from "@/app/actions/getDateDifference";
import CardInfo from "./CardInfo";
import Link from "next/link";

function List() {
  const [isSelected, setIsSelected] = useState<number|null>(null)
  const [searchedTerm, setSearchedTerm] = useState<string>("");
  const [cardInfo, setCardInfo] = useState<Card|null>(null)
  const { setSortedCards, sortedCards } = useCards();
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
  const sortCategory = useOrder((state) => state.sortCategory);
  const sortedCardsByLodash: Card[] = useMemo(() => {
    return _.orderBy(data?.cards, [sortCategory], [sortOrder]);
  }, [data, sortCategory, sortOrder]);
  useEffect(() => {
    setSortedCards(sortedCardsByLodash);
  }, [sortedCardsByLodash]);

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
  const handleRenderInfo=(card:Card)=>{
    cardInfo?.id!==card.id?(
      setIsSelected(card.id),
      setCardInfo(card)
    )
    :
    (
      setIsSelected(null),
      setCardInfo(null)
    )

  }
  //!returnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
  return (
    <div className="flex flex-col  dark:text-white  ">
      <div className="bg-white w-full flex items-center justify-center flex-col lg:px-[10%] max-lg:px-[5%] xl:px-[17%] border-b">
        <div className="flex items-center border justify-center rounded-lg  w-full  relative focus:border-slate-400 text-sm">
          <input
            style={{ direction: "rtl" }}
            type="text"
            value={searchedTerm}
            onChange={(event) => setSearchedTerm(event.target.value)}
            className="font-vazir w-full mr-[50px] ml-[25px] py-2 text-right focus:border-slate-50 focus:outline-none "
            placeholder="...جستجو"
          />
          <FaSearch className="absolute right-[20px] text-black dark:text-white" />
        </div>
        <div className="w-full flex items-center justify-end my-1  ">
          <div className="my-3">
            <ListOrder />
          </div>
        </div>

        {/* <div className="flex items-center justify-center flex-row w-full">
        <input type="text" value={searchedTerm} onChange={(event)=>{setSearchedTerm(event.target.value)}}
        className='w-[100%] border h-[100px] lg:mx-[17%] px-[50px] max-sm:px-[25px]'
        />

        </div> */}
      </div>
      {!isLoading && filteredCards.length === 0 && (
        <div className="flex items-center justify-center w-full h-[300px]  font-vazir font-extrabold ">
          فردی با این نام وجود ندارد
        </div>
      )}
      <div className="w-full flex flex-row lg:px-[10%] max-lg:px-[5%] xl:px-[17%] pt-5">
        {filteredCards.length>0&&
        <div className="w-full bg-white max-lg:hidden mx-3">
         {cardInfo===null?
        <CardInfo isSelected={false}/> :<CardInfo isSelected={true} card={cardInfo}/>
        }
        </div>
      }
        <div className="flex items-center justify-center w-full flex-col pt-10 relative">
        
          {/* <Count/> */}
          <div className=" grid grid-cols-1 gap-4 w-full  ">
            {/* <Modal
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
            </Modal> */}

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
                onClick={()=>handleRenderInfo(item)}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.4, ease: "circInOut" }}
                  key={item.id}
                  className={`${isSelected===item.id&& "border border-slate-600"} cursor-pointer rounded-xl border border-slate-200  bg-white sm:hover:brightness-90 dark:bg-slate-800 transition-all duration-100 flex
         items-start justify-center flex-row p-4 my-3 font-vazir w-full relative `}
                >
                  <Link href={`/list/${item.id}`} className="absolute w-full h-full  lg:hidden -translate-y-4 ">

                  </Link>
                  {/* //!Top of card */}
                  {/* //!اسم و عکس */}

                  <div className="felx flex-col items-center justify-center w-full pr-3">
                    <p className="text-right  text-lg font-extrabold  flex w-full items-center justify-end    ">
                      {item.person}
                    </p>
                    <div className="text-right py-[8px] gap-2  text-[16px] font-vazir  font-extralight    flex w-full items-center justify-end    ">
                      {getPersianNumbers(
                        getPricingFormat(item.amount.toString())
                      )}
                      <p> : قابل پرداخت</p>
                    </div>
                    <div className="text-right py-[5px] gap-2  text-[16px]  font-vazirthin  flex w-full items-center justify-end    ">
                      <p>
                        {getPersianDate(
                          getDateTypeFromPrisma(item.createdAt),
                          true
                        )}
                      </p>
                      <p>: اتمام مهلت</p>
                    </div>
                    <div className="text-right pt-[50px] gap-1  text-[13px]  font-vazirthin  flex w-full items-center justify-end    ">
                      <p>روز پیش</p>
                      <p>
                        {getPersianNumbers(
                          getDateDifference(
                            getCorrectDateTypeFromPrisma(item.createdAt)
                          ).toString()
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="relative w-14 h-14 rounded-md overflow-hidden flex-shrink-0   ">
                    <div
                      style={{
                        backgroundColor: getRandomColorByNumber(item.id),
                      }}
                      className={`absolute w-full h-full  `}
                    ></div>
                    <Image
                      src={Avatar}
                      alt="user-image"
                      className=" opacity-60  "
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
export default List;
