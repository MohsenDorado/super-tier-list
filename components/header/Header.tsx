"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import useRoutes from "@/app/hooks/useRoutes";
import ThemeToggle from "../ThemeToggle";

export default function Header() {
  const links = useRoutes();
  const pathname = usePathname();
  const MotionLink = motion(Link);

  return (
    <nav className="p-8 flex justify-center">
        <ThemeToggle/>
      <ul className="flex gap-10 lg:gap-28 md:gap-16">
        <AnimatePresence>
          {links.map((link) => {
            return (
              <motion.li key={link.label}>
                <MotionLink
                  className={cn(
                    "font-medium relative rounded-xl text-sm py-2 px-4 transition-all duration-500 ease-out"
                  )}
                  href={link.href}
                >
                  <motion.span className="font-bold z-10 relative">
                    {link.label}
                  </motion.span>
                  {pathname === link.href ? (
                    <motion.div
                      transition={{ type: "spring" }}
                      layoutId="underline"
                      className="absolute z-0 w-full h-full rounded-md left-0 bottom-0 bg-[#f3f4f6]"
                    ></motion.div>
                  ) : null}
                </MotionLink>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </nav>
  );
}
