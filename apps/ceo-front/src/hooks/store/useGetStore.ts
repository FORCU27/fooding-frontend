import { storeApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useGetStore = (id: number) => {
  const isClient = typeof window !== 'undefined';
  console.log('isClient:', isClient);
  
  return useQuery({
    queryKey: [queryKeys.ceo.store.getStore, id],
    queryFn: async () => {
      console.log('Fetching store with id:', id);
      try {
        const result = await storeApi.getStore(id);
        console.log('Store fetched successfully:', result);
        return result;
      } catch (error) {
        console.error('Error fetching store:', error);
        throw error;
      }
    },
    staleTime: 0,
    enabled: isClient,
  });
};
