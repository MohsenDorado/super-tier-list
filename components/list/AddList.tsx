"use client"
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';



const AddList = () => {
  const [person, setPerson] = useState("");
  const [amount, setAmount] = useState<number|null>(null); // For storing the raw value



  const createCard = async ({ person, amount }: { person: string; amount: number }) => {
    const response = await fetch('/api/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ person, amount }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to create new card');
    }
  
    return response.json();
  };

  const queryClient = useQueryClient();
 
  const createMutation = useMutation({
    mutationFn: createCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listData"] });
      setPerson('');
      setAmount(null);
      
    },
    onError: (error: Error) => {
      console.error('Error creating card:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount) {
      
      createMutation.mutate({ person, amount });
    }
  };
  const handleAmountChange = (e:any) => {
    const value = e.target.value;
    const numberValue = parseFloat(value);

    // Only set the number if it's a valid number, otherwise default to 0 or NaN
    if (!isNaN(numberValue)) {
      setAmount(numberValue);
    } else {
      setAmount(null); // or another default value
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Person:
          <input
            type="text"
            value={person}
            onChange={(e) => setPerson(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Amount:
          <input
          className='font-vazir decoration'
            type="number"
            value={amount !== null ? amount : ''}
            onChange={handleAmountChange}
            required
            min="0" // Ensures only positive numbers are accepted
            step="1" // Ensures only whole numbers are accepted
            
          />
        </label>
      </div>
      <button type="submit" disabled={createMutation.isPending}>
        {createMutation.isPending ? 'Creating...' : 'Create Card'}
      </button>
    </form>
  );
};

export default AddList;
