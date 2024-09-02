"use client"
import { useCardCount } from '@/app/hooks/useCountAll';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react'

const Count = () => {
    const { data: cardCount, isLoading, error } = useCardCount();


  return (
    <div>

    {isLoading&&
     <div className='rounded-full w-10 h-10 bg-green-500 p-2 m-4 text-red-500 text-center font-bold text-xl'></div>
    }
    {cardCount?.count&&
    
    <div className='rounded-full w-10 h-10 bg-green-500 p-2 m-4 text-red-500 text-center font-bold text-xl'>{cardCount?.count}</div>
  }
  </div>
  )
}

export default Count