import { queryKeys } from '@repo/api/configs/query-keys';
import { GetStoreListParams, storeApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetStoreList = (params?: GetStoreListParams) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.store.list, params],
    queryFn: async () => {
      const response = await storeApi.getStoreList({
        sortType: 'RECENT',
        sortDirection: 'DESCENDING',
        ...params,
      });
      return response.data;
    },
  });
};
