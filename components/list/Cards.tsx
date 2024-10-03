// "use client";

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import Image from "next/image";
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import Avatar from "@/public/Profile_avatar_placeholder_large.png";
// import { CalendarDays, Clock, Trash } from "lucide-react";
// // import DeleteButton from "./DeleteButton";
// import ClipLoader from "react-spinners/ClipLoader";
// import Modal from "./Modal";
// import { motion, AnimatePresence } from "framer-motion";
// import toast from "react-hot-toast";
// import _, { identity } from "lodash";
// import { useOrder } from "@/store/useOrder";
// import getPersianTime from "@/app/actions/getPersianTime";
// import getPersianDate from "@/app/actions/getPersianDate";
// import getRandomColorByNumber from "@/app/actions/getRandomColorByNumber";
// import getPricingFormat from "@/app/actions/getPricingFormat";
// import getDateTypeFromPrisma from "@/app/actions/getCorrectDateTypeFromPrisma";
// import getCorrectDateTypeFromPrisma from "@/app/actions/getCorrectDateTypeFromPrisma";
// import { getPersianNumbers } from "@/app/actions/getPersianNumbers";
// import { CardType } from "@/app/types/card-type";
// import { Card } from "@prisma/client";
// import { useCards } from "@/store/useCards";
// import { FaSearch } from "react-icons/fa";
// import ListOrder from "./ListOrder";
// import Count from "./Count";
// import getDateDifference from "@/app/actions/getDateDifference";
// import CardInfo from "./CardInfo";
// import Link from "next/link";
// import { useSearch } from "@/store/useSearch";
// import { useScrolling } from "@/store/useScrolling";
// import { useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";

// const Cards = ({item, isSelected}:{item:Card,isSelected:number|null}) => {
//   const [localIsSelected, setLocalIsSelected] = useState<number|null>()
//     const [cardId, setCardId] = useState<number | null>(null);
//     const { setSortedCards, sortedCards } = useCards();
//     const [deleting, setDeleting] = useState(false);
//     const [deletingId, setDeletingId] = useState<string>("");
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     useEffect(() => {
//    setLocalIsSelected(isSelected)
//     }, [isSelected])
    
//     const handleRenderInfo = (id: number) => {
//         cardId !== id
//           ? (setLocalIsSelected(id), setCardId(id))
//           : (setLocalIsSelected(null), setCardId(null));
//       };
//   return (
//     <motion.div
//                   onClick={() => handleRenderInfo(item.id)}
//                   initial={{ opacity: 0, scale: 0 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0 }}
//                   transition={{ duration: 0.2, ease: "circInOut" }}
//                   key={item.id}
//                   className={cn(
//                     'cursor-pointer rounded-xl border bg-white sm:hover:brightness-90 dark:bg-slate-800 transition-all duration-100 flex items-start justify-center flex-row p-4 my-1 font-vazir w-full relative',
//                     {
//                       'border-slate-200 dark:border-slate-800': isSelected !== item.id,
//                       'border-slate-600 dark:border-white': isSelected === item.id,
//                     }
//                   )}
           
//                 >
//                   <Link
//                     href={`/list/${item.id}`}
//                     className="absolute w-full h-full  lg:hidden -translate-y-4 "
//                   ></Link>
//                   {/* //!Top of card */}
//                   {/* //!اسم و عکس */}

//                   <div className="felx flex-col items-center justify-center w-full pr-3">
//                     <p className="text-right  text-lg font-extrabold  flex w-full items-center justify-end    ">
//                       {item.person}
//                     </p>
//                     <div className="text-right py-[8px] gap-2  text-[16px] font-vazir  font-extralight    flex w-full items-center justify-end    ">
//                       {getPersianNumbers(
//                         getPricingFormat(item.amount.toString())
//                       )}
//                       <p> : قابل پرداخت</p>
//                     </div>
//                     <div className="text-right py-[5px] gap-2  text-[16px]  font-vazirthin  flex w-full items-center justify-end    ">
//                       <p>
//                         {getPersianDate(
//                           getDateTypeFromPrisma(item.createdAt),
//                           true
//                         )}
//                       </p>
//                       <p>: اتمام مهلت</p>
//                     </div>
//                     <div className="text-right pt-[50px] gap-1  text-[13px]  font-vazirthin  flex w-full items-center justify-end">
//                       <p>
//                         {getDateDifference(
//                           getCorrectDateTypeFromPrisma(item.createdAt)
//                         ) === 0
//                           ? "امروز" // "Today" in Persian
//                           : getDateDifference(
//                               getCorrectDateTypeFromPrisma(item.createdAt)
//                             ) === 1
//                           ? "دیروز" // "Yesterday" in Persian
//                           : "روز پیش"}
//                       </p>
//                       {getDateDifference(
//                         getCorrectDateTypeFromPrisma(item.createdAt)
//                       ) > 1 && (
//                         <p>
//                           {getPersianNumbers(
//                             getDateDifference(
//                               getCorrectDateTypeFromPrisma(item.createdAt)
//                             ).toString()
//                           )}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                   <div className="relative w-14 h-14 rounded-md overflow-hidden flex-shrink-0   ">
//                     <div
//                       style={{
//                         backgroundColor: getRandomColorByNumber(item.id),
//                       }}
//                       className={`absolute w-full h-full  `}
//                     ></div>
//                     <Image
//                       src={Avatar}
//                       alt="user-image"
//                       className=" opacity-60  "
//                     />
//                   </div>
//                 </motion.div>
//   )
// }

// export default Cards