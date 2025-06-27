import { queryKeys } from '@repo/api/configs/query-keys';
import { GetStoreListParams, storeApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetStoreImmediateEntryList = (params?: GetStoreListParams) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.store.immediateEntryList, params],
    queryFn: async () => {
      const response = await storeApi.getStoreImmediateEntryList({
        ...params,
      });
      return response.data;
    },
  });
};
