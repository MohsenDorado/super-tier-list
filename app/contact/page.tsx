"use client"
import React from 'react'
import { useRef, useEffect } from 'react';
import { useRefStore } from '@/store/useRefStore';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';


const ContactPage = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const setRef = useRefStore((state) => state.setRef);

  
  useEffect(() => {
    if (divRef.current) {
      setRef(divRef);
    }
  }, [divRef, setRef]);


  return (
    <div
    className='h-[200vh] relative'>
      <Hero/>
      <Features/>
      
    </div>
  )
}

export default ContactPage