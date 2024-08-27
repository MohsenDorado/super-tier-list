// components/Header.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useRoutes from "@/app/hooks/useRoutes";
import { IoIosArrowDown, IoIosClose, IoIosMenu } from "react-icons/io";
import ThemeToggle from "./header/ThemeToggle";
import Link from "next/link";


export default function TestHeader() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const routes = useRoutes();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black shadow-lg font-Yekan">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">MyWebsite</div>
        <div className="md:hidden flex gap-10">
        <ThemeToggle/>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 dark:text-white"
                key={isMobileMenuOpen ? "x-icon" : "menu-icon"}
              >
                {isMobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" /> // X icon
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" /> // Hamburger icon
                )}
              </motion.svg>
            </motion.div>
          </button>
        </div>
        <ul className="hidden md:flex space-x-8">
        <ThemeToggle/>

          {routes.map((item) => (
            <li
              key={item.label}
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative"
            >
              <Link
                href={item.href}
                className="text-gray-700 dark:text-white hover:text-blue-500 flex items-center justify-center"
              >
                {item.children && <IoIosArrowDown />}
                {item.label}
              </Link>
              {item.children && (
                <AnimatePresence>
                  {hoveredItem === item.label && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-black shadow-md rounded-md"
                    >
                      <motion.div
                       initial={{ opacity: 0, x: -100 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -100 }}
                        className="absolute flex items-center justify-center z-0 w-full h-[20px]  left-0 bottom-0 dark:bg-white bg-[#172542] "
                      ></motion.div>
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            className="right-0  top-0 flex px-4 py-2 rounded-md text-gray-700 dark:text-white hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-500"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden bg-white dark:bg-black shadow-lg overflow-hidden"
          >
            <ul className="space-y-2 py-4 px-6">
                
              {routes.map((item) => (
                <li key={item.label}>
                  <div 
                    onClick={() =>
                        setHoveredItem(
                          hoveredItem === item.label ? null : item.label
                        )
                      }
                  
                  className="flex justify-between items-center">
                    <Link
                      href={item.href}
                      className="block text-gray-700 dark:text-white hover:text-blue-500"
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <IoIosArrowDown
                        className="text-gray-700 dark:text-white"
                        onClick={() =>
                          setHoveredItem(
                            hoveredItem === item.label ? null : item.label
                          )
                        }
                      />
                    )}
                  </div>
                  {item.children && hoveredItem === item.label && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ type: "spring" }}
                      className="pl-4 mt-2 space-y-1"
                    >
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            className="block dark:text-blue-500 hover:text-blue-500 text-blue-400"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
