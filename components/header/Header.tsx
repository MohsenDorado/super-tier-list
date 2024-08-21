"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import useRoutes from "@/app/hooks/useRoutes";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const links = useRoutes();
  const pathname = usePathname();
  const MotionLink = motion(Link);

  return (
    <nav className="p-8 flex justify-center">
        <ThemeToggle/>
      <ul className="flex gap-10 lg:gap-28 md:gap-16">
          {links.map((link) => {
            return (
              <li key={link.label}>
                <Link
                  className={cn(
                    "font-medium relative rounded-xl text-sm py-2 px-4 ease-out"
                  )}
                  href={link.href}
                >
                  <span className="font-bold z-10 relative">
                    {link.label}
                  </span>
                  
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
