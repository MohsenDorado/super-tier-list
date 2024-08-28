"use client";

import ReactQueryProvider from "@/app/providers/ReactQueryProvider";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import Avatar from "@/public/Profile_avatar_placeholder_large.png";
import jalaali from "jalaali-js";
import { convertToPersianNumerals } from "@/utils/convertNumbers";

export default function List() {
  return (
    <div>
      <ReactQueryProvider>
        <ListCard />
      </ReactQueryProvider>
    </div>
  );
}
function ListCard() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["listData"],
    queryFn: () => fetch("api/list").then((res) => res.json()),
  });
  function getPersianDate(gregorianDate: Date): string {
    const { jy, jm, jd } = jalaali.toJalaali(gregorianDate);
    const persianDate = `${convertToPersianNumerals(
      jy.toString()
    )} / ${convertToPersianNumerals(jm.toString())} / ${convertToPersianNumerals(
      jd.toString()
    )}`;

    return persianDate;
  }

  const createFormat = (string: string) => {
    const gregorianDate = new Date(string);
    return gregorianDate;
  };
  function formatNumberString(input: string) {
    // Remove all non-digit characters from the input
    let cleanedInput = input.replace(/\D/g, "");

    // Reverse the cleaned input
    let reversed = cleanedInput.split("").reverse().join("");

    // Add a space every 3 digits
    let spacedReversed = reversed.replace(/(\d{3})(?=\d)/g, "$1 , ");

    // Reverse the string back to the original order
    let result = spacedReversed.split("").reverse().join("");

    return result;
  }
  function numberToRandomColor(seed: number): string {
    // Seed the random number generator with the provided number
    const rng = (seed: number) => {
      let x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    // Generate random values for R, G, and B
    const r = Math.floor(rng(seed) * 256);
    const g = Math.floor(rng(seed * 2) * 256);
    const b = Math.floor(rng(seed * 3) * 256);

    // Convert the values to a hexadecimal color string
    const color = `#${((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)}`;

    return color;
  }
  return (
    <div className="grid grid-cols-1 lg:mx-[17%]  md:grid-cols-2 lg:grid-cols-2 gap-4 px-[50px] max-sm:px-[25px] dark:text-white ">
      {data?.map((item: any) => (
        <div
          key={item.id}
          className="rounded-xl shadow-md bg-slate-50 dark:bg-slate-800 transition-all duration-500 flex
         items-center justify-center flex-col p-4 my-3 font-vazir w-full"
        >
          {/* //!Top of card */}
          {/* //!اسم و عکس */}
          <div className="flex items-center justify-end w-full ">
            <div className=" flex items-center justify-between w-full">
              <p className="text-right mx-3 w-[75%] md:text-xl font-bold right-0 translate-x-2  ">{item.person}</p>
              <div className="relative">
                <div
                  style={{ backgroundColor: numberToRandomColor(item.id) }}
                  className={`absolute rounded-full shadow-xl   w-16 h-16 max-sm:w-10 max-sm:h-10`}
                ></div>
                <Image
                  src={Avatar}
                  alt="user-image"
                  className="rounded-full w-16 h-16 max-sm:w-10 max-sm:h-10 opacity-80 border-2 border-black"
                />
              </div>
            </div>
          </div>
          {/* //!بدهی */}
          <div className="flex items-center justify-end w-full">
            <div className="font-vazir  text-xl my-10">
              <div className="flex items-center justify-center gap-5 max-sm:text-lg">
                <p>
                  {convertToPersianNumerals(
                    formatNumberString(item.amount.toString())
                  )}
                </p>
                <p>: بدهی</p>
              </div>
            </div>
          </div>
          {/* //! : تاریخ تشکیل */}
          <div className="flex items-center justify-end w-full">
            <div className="font-vazir  text-xl">
              <div className="flex items-center justify-center gap-5 max-sm:text-sm">
                <p>{getPersianDate(createFormat(item.createdAt))}</p>
                <p>: تاریخ تشکیل</p>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      ))}
    </div>
  );
}
