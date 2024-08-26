// components/Header.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useRoutes from "@/app/hooks/useRoutes";
import { IoIosArrowDown, IoIosClose, IoIosMenu } from "react-icons/io";
import { Menu } from "./header/Menu";

export default function TestHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const routes = useRoutes();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg font-Yekan">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">MyWebsite</div>
        <div className="md:hidden">
          <div
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <Menu isActive={isMobileMenuOpen} />
          </div>
        </div>
        <ul className="hidden md:flex space-x-8">
          {routes.map((item) => (
            <li
              key={item.label}
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative"
            >
              <a
                href={item.href}
                className="text-gray-700 hover:text-blue-500 flex items-center justify-center"
              >
                {item.children && <IoIosArrowDown />}
                {item.label}
              </a>
              {item.children && (
                <AnimatePresence>
                  {hoveredItem === item.label && (
                    <motion.ul
                      transition={{ type: "spring" }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md"
                    >
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <a
                            href={child.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-500"
                          >
                            {child.label}
                          </a>
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
            className="md:hidden bg-white shadow-lg overflow-hidden"
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
                    className="flex justify-between items-center"
                  >
                    <a
                      href={item.href}
                      className="block text-gray-700 hover:text-blue-500"
                    >
                      {item.label}
                    </a>
                    {item.children && (
                      <IoIosArrowDown
                        className="text-gray-700 w-[10%]"
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
                          <a
                            href={child.href}
                            className="block text-gray-700 hover:text-blue-500"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {child.label}
                          </a>
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
