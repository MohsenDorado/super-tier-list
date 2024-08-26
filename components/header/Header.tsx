"use client";
import Link from "next/link";
import useRoutes from "@/app/hooks/useRoutes";
import ThemeToggle from "./ThemeToggle";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { Menu } from "./Menu";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import NavChild from "./NavChild";

export default function Header() {
  const [isVisible, setIsVisible] = useState("");
  const pathname = usePathname();

  const routes = useRoutes();
  const router = useRouter();
  return (
    <header className="font-Yekan px-[50px] z-50 lg:px-[17%] lg:justify-between max-sm:px-2 fixed h-[60px] top-0 left-0 w-full dark:bg-black bg-white  backdrop-blur-md  flex items-center justify-between ">
      <h1
        className="cursor-pointer text-3xl"
        onClick={() => {
          router.push("/");
        }}
      >
        Logo
      </h1>
      <div className="flex items-center justify-center gap-10">
        <ThemeToggle />
        <nav className="flex items-center justify-center ">
          <ul className="flex items-center justify-center gap-5  max-lg:hidden ">
            <AnimatePresence>
              {routes.map((route) => (
                <li
                  onMouseLeave={() => setIsVisible('')}
                  onMouseEnter={() => setIsVisible(route.href)}
                  key={route.href}
                  className="group relative"
                >
                  <Link className=" " href={route.href}>
              
                    <span className="z-10  p-2 flex items-center justify-center">
                      {route.children && <IoIosArrowDown />}
                      {route.label !== "Home" && route.label}
                    </span>
                    <AnimatePresence>
                              {isVisible===route.href&&<NavChild isVisible={true} key={route.href}/>}

                            </AnimatePresence>
                    {pathname === route.href ? (
                      <motion.div
                        transition={{ type: "spring" }}
                        layoutId="underline2"
                        className="absolute flex items-center justify-center z-0 w-full h-[2px]  left-0 bottom-0 dark:bg-white bg-[#172542] "
                      ></motion.div>
                    ) : null}
                  </Link>
                  {/* {route?.children && (
                    <ul>
                        {route.children.map((child) => (
                          <li
                          key={child.href}
                          className="hidden group-hover:flex absolute bg-red-50 w-[200px] left-auto right-0 rounded-lg"
                          >
                            <AnimatePresence>
                              {isVisible===child.href}

                            </AnimatePresence>
                          </li>
                        ))}
                    </ul>
                  )} */}
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
