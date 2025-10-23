import { couponApiV2 } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useSearchUsers = (storeId: number | null, keyword: string) => {
  return useQuery({
    queryKey: [queryKeys.ceo.user.search, storeId, keyword],
    queryFn: () => {
      if (!storeId) {
        throw new Error('Store ID is required');
      }
      return couponApiV2.searchUsers({ storeId, keyword });
    },
    enabled: !!storeId && keyword.length >= 2, // 2글자 이상일 때만 검색
    staleTime: 1000 * 60, // 1분간 캐시
  });
};
