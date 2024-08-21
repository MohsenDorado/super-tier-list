"use client";
import Link from "next/link";
import useRoutes from "@/app/hooks/useRoutes";
import ThemeToggle from "./ThemeToggle";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { Menu } from "./Menu";
import { useRouter } from "next/navigation";

export default function Header() {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const routes = useRoutes();
  const router=useRouter();
  return (
    <header className="px-[50px] max-sm:px-2 fixed h-[40px] top-0 left-0 w-full bg-white bg-opacity-[0.0001] backdrop-blur-md shadow-lg z-50 flex items-center justify-between lg:justify-center">
      <h1 className="cursor-pointer" onClick={()=>{router.push('/')}}>Site Name</h1>
      <div className="flex items-center justify-center gap-10">
      <button>
        <IoIosSearch className="w-6 h-6" />
      </button>

      <ThemeToggle/>
      <nav className="flex items-center justify-center">
        <ul className="flex items-center justify-center gap-5 text-xs max-sm:hidden">
          {routes.map((route) => (
            <li key={route.href}>
              <Link href={route.label}>
              
              {route.label!=="Home"&&route.label}
              </Link>
              </li>
          ))}
          
         
        
        </ul>
          <Menu />
      </nav>
      </div>
    </header>
  );
}
