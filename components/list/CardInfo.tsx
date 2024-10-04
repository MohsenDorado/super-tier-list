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
import OtherCards from "./OtherCards";
import Cards from "./Cards";
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
  const { detailsRoutes, selected } = useDetalisRoutes();
  const [selectedComponet, setSelectedComponet] = useState<
    "details" | "personal" | "others"
  >("details");

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
  const handleChangeComponent = (
    selected: "details" | "personal" | "others"
  ) => {
    setSelectedComponet(selected);
  };
  return (
    <div className="flex items-center  flex-col w-full   dark:bg-slate-800 px-[15px] ">
      {cardData && (
        <div className=" w-full">
          <div className="sticky top-0 max-lg:top-[55px] bg-white dark:bg-slate-800 flex items-center justify-between flex-col w-full text-right  ">
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
          <div className="font-vazirthin text-black text-right py-10">
            کاربر گرامی <span className="font-vazir">{cardData.person}</span>، شما در حال مشاهده وضعیت بدهی‌ها و پرداخت‌های
            خود به صندوق وام هستید. لطفاً اطلاعات مربوط به اقساط، موعد پرداخت‌ها
            و هرگونه تاخیر احتمالی را با دقت بررسی نمایید. پرداخت به موقع اقساط
            نه تنها به شما کمک می‌کند که از مشکلات مالی جلوگیری کنید، بلکه موجب
            می‌شود اعتبار مالی شما نزد صندوق حفظ شود. همچنین، با رعایت تعهدات
            مالی، به گردش بهتر وام‌ها برای سایر اعضای صندوق نیز کمک خواهید کرد.
            در صورت نیاز به اطلاعات بیشتر درباره شرایط پرداخت، تاریخ‌های دقیق یا
            وجود هرگونه سوال، تیم پشتیبانی ما در هر زمان آماده ارائه
            راهنمایی‌های لازم به شما است. قدردان همراهی شما هستیم و امیدواریم با
            همکاری شما، روند تسویه حساب‌ها به سادگی و بدون مشکل انجام شود.
          </div>
          <div className="sticky top-[50px] max-lg:top-[110px] bg-white dark:bg-slate-800 mt-3">
            <div className="flex items-center justify-center w-full text-[15px] font-vazir ">
              {detailsRoutes.map((route) => (
                <div
                  className="relative  flex items-center justify-between w-full  "
                  key={route.selected}
                >
                  <button
                    onClick={() => handleChangeComponent(route.selected)}
                    className="p-3 bg-transparent w-full "
                  >
                    {route.label}
                  </button>
                  {selectedComponet === route.selected && (
                    <span className="w-full h-[4px] rounded-full bg-blue-500 absolute bottom-0 z-50"></span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="">
            {selectedComponet === "details" && (
              <DetailsComponent data={cardData} />
            )}
            {selectedComponet === "others" && (
              <Cards id={cardData.id} admin={false}/>
            )}
            {selectedComponet === "personal" && "personals"}
          </div>
        </div>
      )}
    </div>
  );
};
export default CardInfo;
