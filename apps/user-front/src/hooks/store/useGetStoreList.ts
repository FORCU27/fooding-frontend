import { queryKeys } from '@repo/api/configs/query-keys';
import { GetStoreListParams, storeApi } from '@repo/api/user';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const getStoreListQueryOptions = (params?: GetStoreListParams) =>
  queryOptions({
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

export const useGetStoreList = (params?: GetStoreListParams) => {
  return useSuspenseQuery(getStoreListQueryOptions(params));
};
