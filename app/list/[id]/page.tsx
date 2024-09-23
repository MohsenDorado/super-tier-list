"use client"
import CardInfo from '@/components/list/CardInfo'
import { Card } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const ListIdPage = () => {
  const {id}=useParams();
  // const { isLoading, error, data,isPending } = useQuery<Card>({
  //   queryKey: ["oneCard"],
  //   queryFn: () => fetch(`/api/list/${id}`).then((res) => res.json()),
  // });
  const parsedId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10);
  return (
    <div className='mt-[70px]'>
     
      <CardInfo isSelected={true} id={parsedId.toString()}/>
    </div>
  )
}
export default ListIdPage