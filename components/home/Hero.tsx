"use server"
import React from 'react'
import heroImage from "@/public/business-loan.png"
import Image from 'next/image'
const Hero = () => {
  return (
    <section className="relative w-full h-screen bg-gray-800 z-0">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={heroImage}
          alt="Hero Image"
          className="w-full h-full object-cover object-center fixed"
        />
      </div>
      <div className='bg-black opacity-30 dark:opacity-60 absolute w-full h-full'>

      </div>
      <div className="relative  flex items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-white md:text-6xl">
          Welcome to My Website
        </h1>
      </div>
    </section>  )
}

export default Hero