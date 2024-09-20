"use client"
import CardInfo from '@/components/list/CardInfo'
import { Card } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ListIdPage = () => {
  const [cardData, setCardData] = useState<Card|null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>("")
  const {id}=useParams();

  // const { isLoading, error, data,isPending } = useQuery<Card>({
  //   queryKey: ["oneCard"],
  //   queryFn: () => fetch(`/api/list/${id}`).then((res) => res.json()),
  // });
  
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/list/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setCardData(result);
    } catch (error:any) {
      setError(error.message);
    } finally{
      setLoading(false)
    }
  };

  fetchData();
}, [])

  const parsedId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10);

  return (
    <div className='mt-[70px]'>
      {
        loading&&"Loadingggggg"
      }
      {cardData&&
      
      <CardInfo isSelected={true} card={cardData}/>
      }
    </div>
  )
}

export default ListIdPage