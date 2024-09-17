"use client"
import React from 'react'
import ListSearch from './ListSearch'
import { useCards } from '@/store/useCards';

const ListHeader = () => {
  const{sortedCards}=useCards();
  return (
    <div className='w-full bg-white lg:px-[300px]'>

      <ListSearch/>
    </div>
  )
}

export default ListHeader