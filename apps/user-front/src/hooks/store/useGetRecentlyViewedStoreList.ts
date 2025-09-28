import { storeApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetRecentlyViewedStoreList = () => {
  return useSuspenseQuery({
    queryKey: ['recently-viewed-stores'],
    queryFn: async () => {
      const response = await storeApi.getRecentlyViewedStoreList();
      return response.data;
    },
  });
};
