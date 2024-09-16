"use client"
import {CardType} from '@/app/types/card-type';
import { useQuery } from '@tanstack/react-query';
import React from 'react'


const AdminList = () => {
    const { isLoading, error, data} = useQuery<CardType>({
        queryKey: ["listData"],
        queryFn: () => fetch("api/list").then((res) => res.json()),
        staleTime:5*60*1000,
        refetchOnWindowFocus:false,
        
      });
console.log(data?.cards);

  return (
    <div className=''>
            {data?.cards.map((card)=>(
                <div key={card.id}>
                    {card.person}
                </div>
            ))}
    </div>
  )
}

export default AdminList