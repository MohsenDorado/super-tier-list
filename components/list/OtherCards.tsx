import { Card } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import CardInfo from './CardInfo';

const OtherCards = ({id}:{id:number}) => {
    const { isLoading, error, data } = useQuery<Card[]>({
        queryKey: ["othercards"],
        queryFn: () => fetch(`api/list/person/${id}`).then((res) => res.json()),
      });
    
  return (
    <div>
        {data?.map((card)=>(

            <CardInfo isSelected id={card.id.toString()}/>
        ))}
    </div>
  )
}

export default OtherCards