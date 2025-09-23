import { storeApi } from '@repo/api/ceo';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetStoreList = () => {
  return useSuspenseQuery({
    queryKey: ['stores', 'list'],
    queryFn: async () => {
      const response = await storeApi.getStores();
      return response.data;
    },
  });
};
