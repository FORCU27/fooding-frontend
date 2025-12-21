import { queryKeys } from '@repo/api/configs/query-keys';
import { storeApi } from '@repo/api/user';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const getPopularViewedStoreListQueryOptions = () =>
  queryOptions({
    queryKey: [queryKeys.user.store.popularViewedStores],
    queryFn: async () => {
      const response = await storeApi.getPopularViewedStoreList();
      return response.data;
    },
  });

export const useGetPopularViewedStoreList = () => {
  return useSuspenseQuery(getPopularViewedStoreListQueryOptions());
};
