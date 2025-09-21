import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { menuApi, GetMenuListParams } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';

export const useGetMenuList = (
  params: GetMenuListParams,
  options?: Omit<UseQueryOptions<any, any, any, any>, 'queryKey' | 'queryFn'>
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