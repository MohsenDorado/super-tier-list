"use client"
import { Card } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

const Cards = ({admin,id}:{admin:boolean,id:number}) => {
    const { isLoading, error, data,isPending } = useQuery<Card>({
        queryKey: ["adminCards"],
        queryFn: () => fetch(`/api/list/${id}`).then((res) => res.json())      });
  return (
    <div className='w-full rounded-lg bg-white border-2 shadow-sm'>
        {isLoading&&
        <div className='w-full h-5 animate-pulse bg-slate-200'>sdfasf</div>
        }
        {data?.person}
    </div>
  )
}

export default Cards