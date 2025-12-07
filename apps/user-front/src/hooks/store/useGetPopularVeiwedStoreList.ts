import { queryKeys } from '@repo/api/configs/query-keys';
import { storeApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetPopularViewedStoreList = () => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.store.popularViewedStores],
    queryFn: async () => {
      const response = await storeApi.getPopularViewedStoreList();
      return response.data;
    },
  });
};
