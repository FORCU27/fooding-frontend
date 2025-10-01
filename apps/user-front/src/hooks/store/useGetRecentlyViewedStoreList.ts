import { queryKeys } from '@repo/api/configs/query-keys';
import { storeApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetRecentlyViewedStoreList = () => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.store.recentlyViewedStores],
    queryFn: async () => {
      const response = await storeApi.getRecentlyViewedStoreList();
      return response.data;
    },
  });
};
