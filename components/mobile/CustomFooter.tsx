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
import { cn } from "@/lib/utils";

const CustomFooter = () => {
    const pathname = usePathname();
    const MotionLink = motion(Link);
    const links = useRoutes();

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
        dark:bg-black
        border-t-[1px] 
        lrg:hidden
      "
    >
         <nav className=" flex justify-center w-full h-full  ">
         <ul className="flex w-full h-full   ">
                      <AnimatePresence>
          {links.map((link) => {
            return (
              <motion.li key={link.label} className="flex items-center justify-center   w-[33.33333%] flex-col h-full hover:bg-slate-50 dark:hover:bg-[#0c1527f6] ">

                <MotionLink
                  className=" font-medium relative w-full  h-full text-[12px]  ease-out flex items-center justify-center flex-col"
                  
                  href={link.href}
                >
                  {link.active?(
                    <link.activeIcon className="w-8 h-8 z-10"/>

                  )
                :
                (
                  <link.icon className="w-8 h-8 z-10"/>

                )
                }
                  <motion.span className="font-bold z-10 relative ">
                    {link.label}
                  </motion.span>
                  {pathname === link.href ? (
                    <motion.div
                      transition={{ type: "spring" }}
                      layoutId="underline"
                      className="absolute flex items-center justify-center z-0 w-full h-full  left-0 bottom-0 bg-slate-200 dark:bg-[#172542] "
                    ></motion.div>
                  ) : null}
                </MotionLink>
              </motion.li>
            );
          })}
        </AnimatePresence>
        </ul>
        </nav>

    </div>
  );
};

export default CustomFooter;
