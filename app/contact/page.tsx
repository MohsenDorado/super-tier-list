"use client"
import React from 'react'
import { useRef, useEffect } from 'react';
import { useRefStore } from '@/store/useRefStore';


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
    ref={divRef}
    className='h-[200vh]'>ContactPage</div>
  )
}

export default ContactPage