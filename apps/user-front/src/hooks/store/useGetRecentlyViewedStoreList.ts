import { queryKeys } from '@repo/api/configs/query-keys';
import { storeApi } from '@repo/api/user';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const getRecentlyViewedStoreListQueryOptions = () =>
  queryOptions({
    queryKey: [queryKeys.user.store.recentlyViewedStores],
    queryFn: async () => {
      const response = await storeApi.getRecentlyViewedStoreList();
      return response.data;
    },
  });

export const useGetRecentlyViewedStoreList = () => {
  return useSuspenseQuery(getRecentlyViewedStoreListQueryOptions());
};
