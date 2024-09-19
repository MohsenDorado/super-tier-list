"use client"
import CardInfo from '@/components/list/CardInfo'
import { useParams } from 'next/navigation'
import React from 'react'

const ListIdPage = () => {
  const {id}=useParams();
  const parsedId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10);

  return (
    <div className='mt-[70px]'>
      <CardInfo isSelected={true} id={parsedId.toString()}/>
    </div>
  )
}

export default ListIdPage