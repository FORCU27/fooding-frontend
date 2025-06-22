import { queryKeys } from '@repo/api/configs/query-keys';
import { GetStoreListParams, GetStoreListResponse, storeApi } from '@repo/api/user';
import { useQuery } from '@tanstack/react-query';

export const useGetStoreList = (params: GetStoreListParams) => {
  return useQuery<GetStoreListResponse, Error>({
    queryKey: [queryKeys.user.store.list, params],
    queryFn: async () => {
      const response = await storeApi.getStoreList(params);
      return response;
    },
    staleTime: 1000 * 60,
  });
};
