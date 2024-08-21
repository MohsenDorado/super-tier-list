"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { PiUserCircleLight } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import {
  IoCheckbox,
  IoCheckboxOutline,
  IoHome,
  IoHomeOutline,
} from "react-icons/io5";
import Link from "next/link";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import useRoutes from "@/app/hooks/useRoutes";

const MobileFooter = () => {
  const routes = useRoutes();
  return (
    <div
      className="
      lg:hidden

        fixed 
        justify-between 
        caveat-light
        w-full 
        h-[60px]
        bottom-0 
        z-50 
        flex 
        items-center 
        bg-white 
        border-t-[1px] 
        lrg:hidden
      "
    >
              <AnimatePresence>


      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={clsx(
            `
          flex 
          items-center
          flex-col
          leading-6 
          font-semibold 
          w-full 
          justify-center 
          h-full
          
          text-gray-500 
          hover:bg-gray-200
        `,
            route.active && "bg-gray-100"
          )}
        >
          {route.active ? (
            <route.icon className="w-7 h-7 text-black dark:bg-black  stroke-2" />
          ) : (
            <route.icon className="w-6 h-6 " />
          )}

          <p
            className={clsx(
              `text-sm  pb-1`,
              route.active &&
                " text-md text-black font-extrabold "
            )}
          >
            {route.label}
          </p>
        </Link>
      ))}
  </AnimatePresence>

    </div>
  );
};

export default MobileFooter;
