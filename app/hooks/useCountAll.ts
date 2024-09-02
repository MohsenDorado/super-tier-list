// hooks/useCardCount.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchCardCount = async () => {
  const response = await axios.get('/api/list');
  // console.log(response.data);
  return response.data;
};

export const useCardCount = () => {
  return useQuery({queryKey:['listData'],queryFn:fetchCardCount});
};
