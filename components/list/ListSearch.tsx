"use client"
import { useCards } from '@/store/useCards';
import React, { useEffect, useMemo, useState } from 'react'

const ListSearch = () => {
  const{sortedCards,setSortedCards,setFilteredCards,filteredCards}=useCards();
  
  const [searchedTerm, setSearchedTerm] = useState<string>("")
  const tempFilteredCards = useMemo(() => {
    if (!searchedTerm.trim()) {
      return sortedCards; // If the search term is empty, return all cards
    }
    return sortedCards.filter((card) =>
      card.person.toLowerCase().includes(searchedTerm.trim().toLowerCase())
    );
  }, [searchedTerm, sortedCards]);

useEffect(() => {
  setFilteredCards(tempFilteredCards)
}, [searchedTerm])

  return (
    <div>
        <input type="text" value={searchedTerm} onChange={(event)=>{setSearchedTerm(event.target.value)}}
        className='w-full border h-[100px]'
        />
    </div>
  )
}

export default ListSearch