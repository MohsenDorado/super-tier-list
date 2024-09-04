"use client"
import { useOrder } from '@/store/useOrder';
import React from 'react';

const ListOrder: React.FC = () => {
  const { sortOrder, toggleSortOrder } = useOrder();

  return (
    <button onClick={toggleSortOrder}>
      {sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
    </button>
  );
};

export default ListOrder;