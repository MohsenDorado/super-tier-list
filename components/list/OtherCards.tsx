import { Card } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import CardInfo from './CardInfo';

const OtherCards = ({id}:{id:number}) => {
    const { isLoading, error, data,isPending } = useQuery<Card[]>({
        queryKey: ["othercards"],
        queryFn: () => fetch(`/api/list/person/${id}`).then((res) => res.json()),
        refetchOnMount:true
      });
    
  return (
    <div className='flex'>
         
        {isLoading&&
        <div className='animate-pulse w-4 h-2 bg-slate-200'>
s;lkngasgdlknr
        </div>
        }
        {data&&
        (
            <div>
                کارت دیگر دارید
                {data.length}

            </div>
        )
        
        }
    </div>
  )
}

export default OtherCards