import { queryKeys } from '@repo/api/configs/query-keys';
import { GetStoreListParams, GetStoreListReponse, storeApi } from '@repo/api/user';
import { useQuery } from '@tanstack/react-query';

export const useGetStoreList = (param: GetStoreListParams) => {
  const { data, isLoading, error, refetch } = useQuery<GetStoreListReponse, Error>({
    queryKey: [queryKeys.user.stores, { param }],
    queryFn: () => storeApi.getStoreList({ ...param }),
    staleTime: 1000 * 60,
  });

  return {
    stores: data?.data.list ?? [],
    totalCount: data?.data.pageInfo.totalCount ?? 0,
    loading: isLoading,
    error,
    refetch,
  };
};
