"use client"
import { useRef, useEffect } from 'react';
import { useRefStore } from '@/store/useRefStore';


import Image from "next/image";
import ThemeToggle from "../components/header/ThemeToggle";
import Header from "@/components/header/Header";

export default function Home() {
  const divRef = useRef<HTMLDivElement | null>(null);
  const setRef = useRefStore((state) => state.setRef);

  useEffect(() => {
    if (divRef.current) {
      setRef(divRef);
    }
  }, [divRef, setRef]);

  return (
    <div ref={divRef}>
      <div>
        ورود
      </div>

    <div className="font-Yekan h-[400vh] w-full dark:bg-[#101833] bg-slate-300">ورود </div>
    </div>
  );
}
