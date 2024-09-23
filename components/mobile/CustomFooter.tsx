"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import useRoutes from "@/app/hooks/useRoutes";
const CustomFooter = () => {
  const spring = {
    type: "ease",
    stiffness: 100,
  };
  const pathname = usePathname();
  const links = useRoutes();

  return (
    <nav
      className="lg:hidden
        fixed 
        justify-between 
        w-full 
        h-[60px]
        bottom-0 
        z-50 
        flex 
        items-center 
        bg-white 
        dark:bg-black
        shadow-md
        
        "
    >
      <ul className="flex w-full h-full   ">
        <AnimatePresence>
          {links.map((link) => {
            return (
              <li
                key={link.label}
                className="font-Yekan flex items-center justify-center   w-[33.33333%] flex-col h-full hover:bg-slate-50 dark:hover:bg-[#0c1527f6] "
              >
                <Link
                  className=" font-medium relative w-full  h-full text-[10px]  ease-out flex items-center justify-center flex-col"
                  href={link.href}
                >
                  {link.active ? (
                    <link.activeIcon className="w-6 h-6 z-10 " />
                  ) : (
                    <link.icon className="w-6 h-6 z-10 " />
                  )}
                  <span className=" z-10 relative ">{link.label}</span>
                  {pathname === link.href ? (
                    <motion.div
                      transition={spring}
                      layoutId="underline"
                      className="absolute flex items-center justify-center z-0 w-full h-full  left-0 bottom-0 bg-slate-200 dark:bg-[#172542] "
                    ></motion.div>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </AnimatePresence>
      </ul>
    </nav>
  );
};

export default CustomFooter;
