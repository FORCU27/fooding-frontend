import { menuApi, type GetMenuListParams, type GetMenuListResponse } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

export const useGetMenuList = (
  params: GetMenuListParams,
  options?: Omit<UseQueryOptions<GetMenuListResponse['data'], Error, GetMenuListResponse['data'], readonly unknown[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: [queryKeys.ceo.menu.list, params],
    queryFn: () => menuApi.getMenuList(params),
    enabled: !!params.storeId,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    gcTime: 10 * 60 * 1000, // 10분간 캐시 보관
    ...options,
  });
};