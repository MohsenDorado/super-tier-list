import ReactQueryProvider from '@/app/providers/ReactQueryProvider';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

const DeleteButton = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  // Mutation to delete the card
  const mutation = useMutation<void, Error, void>(
    () => {
      return fetch(`/api/list/${id}`, {
        method: 'DELETE',
      }).then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete');
        }
        return res.json();
      });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch the list data to reflect the deletion
        queryClient.invalidateQueries(['listData']);
      },
      onError: (error) => {
        console.error('Error deleting card:', error);
      },
    }
  );

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      mutation.mutate();
    }
  };

  return (

    <button onClick={handleDelete} disabled={mutation.isLoading}>
      {mutation.isLoading ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeleteButton;
