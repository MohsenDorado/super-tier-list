"use client";
import Link from "next/link";
import useRoutes from "@/app/hooks/useRoutes";
import ThemeToggle from "./ThemeToggle";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { Menu } from "./Menu";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const pathname = usePathname();

  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const routes = useRoutes();
  const router = useRouter();
  return (
    <header className="font-Yekan px-[50px] max-sm:px-2 fixed h-[40px] top-0 left-0 w-full bg-white bg-opacity-[0.0001] backdrop-blur-md shadow-lg flex items-center justify-between lg:justify-center">
      <h1
        className="cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      >
        صفحه اصلی
      </h1>
      <div className="flex items-center justify-center gap-1">
        {/* <button>
          <IoIosSearch className="w-6 h-6" />
        </button> */}

        <ThemeToggle />
        <nav className="flex items-center justify-center ">
          <ul className="flex items-center justify-center gap-5 text-xs max-lg:hidden ">
            <AnimatePresence>
              {routes.map((route) => (
                <li key={route.href}>
                  <Link className=" relative" href={route.href}>
                  <span className="z-10 relative ">

                    {route.label !== "Home" && route.label}
                  </span>
                    {pathname === route.href ? (
                      <motion.div
                        transition={{ type: "spring" }}
                        layoutId="underline2"
                        className="absolute flex items-center justify-center z-0 w-full h-[2px]  left-0 bottom-0 dark:bg-white bg-[#172542] "
                      ></motion.div>
                    ) : null}
                  </Link>
                </li>
              ))}
            </AnimatePresence>
          </ul>
          <Menu />
        </nav>
      </div>
    </header>
  );
}
