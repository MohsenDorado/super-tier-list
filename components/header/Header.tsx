"use client";
import Link from "next/link";
import useRoutes from "@/app/hooks/useRoutes";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [isVisible, setIsVisible] = useState("");

  const routes = useRoutes();
  const router = useRouter();
  return (
    <header className="border-b-2 border-[#dde1e6] dark:border-blue-800  font-Yekan px-[50px] z-50 lg:px-[17%] lg:justify-between max-sm:px-2 fixed h-[60px] top-0 left-0 w-full dark:bg-black bg-white  backdrop-blur-md  flex items-center justify-between ">
      <h1
        className="cursor-pointer text-3xl font-Yekan font-extrabold text-blue-700 dark:text-blue-300"
        onClick={() => {
          router.push("/");
        }}
      >
        
        کارت <span className="text-black dark:text-white">وام</span>
      </h1>
      <div className="flex items-center justify-center gap-4">
        <ThemeToggle />
        <nav className="flex items-center justify-center  ">
          <ul className="flex items-center justify-center gap-5  max-lg:hidden ">
            <AnimatePresence>
              {routes.map((route) => (
                <li
                  onMouseLeave={() => setIsVisible('')}
                  onMouseEnter={() => setIsVisible(route.href)}
                  key={route.href}
                  className="group relative"
                >
                  <Link className="text-sm text-slate-700 " href={route.href}>
              
                    <span className="z-10  p-2 flex items-center justify-center dark:text-white">
                      {/* {route.children && <IoIosArrowDown />} */}
                      {route.label !== "Home" && route.label}
                    </span>
                              {/* {isVisible===route.href&&<NavChild isVisible={true} key={route.href}/>} */}

                    {isVisible === route.href ? (
                      <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}

                        transition={{ type: "spring" }}
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
          {/* <Menu /> */}
        </nav>
      </div>
    </header>
  );
}
