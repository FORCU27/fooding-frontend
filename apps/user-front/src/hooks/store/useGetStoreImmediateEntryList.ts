import { queryKeys } from '@repo/api/configs/query-keys';
import { GetStoreListParams, storeApi } from '@repo/api/user';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const getStoreImmediateEntryListQueryOptions = (params?: GetStoreListParams) =>
  queryOptions({
    queryKey: [queryKeys.user.store.immediateEntryList, params],
    queryFn: async () => {
      const response = await storeApi.getStoreImmediateEntryList({
        ...params,
      });
      return response.data;
    },
  });

export const useGetStoreImmediateEntryList = (params?: GetStoreListParams) => {
  return useSuspenseQuery(getStoreImmediateEntryListQueryOptions(params));
};
