"use client"
import { useCards } from '@/store/useCards';
import { useSearch } from '@/store/useSearch';
import React, { useEffect, useMemo, useState } from 'react'

const ListSearch = () => {
  const{sortedCards,setSortedCards,setFilteredCards,filteredCards}=useCards();
  const{searchedText,setSearchedText}=useSearch();

  const tempFilteredCards = useMemo(() => {
    if (!searchedText.trim()) {
      return sortedCards; // If the search term is empty, return all cards
    }
    return sortedCards.filter((card) =>
      card.person.toLowerCase().includes(searchedText.trim().toLowerCase())
    );
  }, [searchedText, sortedCards]);

useEffect(() => {
  setFilteredCards(tempFilteredCards)
}, [searchedText])

  return (
    <div>
        <input type="text" value={searchedText} onChange={(event)=>{setSearchedText(event.target.value)}}
        className='w-full border h-[100px]'
        />
    </div>
  )
}

export default ListSearch