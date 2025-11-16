import { storeApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useStatistics = (storeId: number | null, date: string) => {
  const isClient = typeof window !== 'undefined';

  return useQuery({
    queryKey: [queryKeys.ceo.store.statistics, storeId, date],
    queryFn: async () => {
      if (!storeId) {
        throw new Error('Store ID is required');
      }
      const result = await storeApi.getStatistics({ storeId, date });
      return result;
    },
    enabled: isClient && !!storeId && !!date,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    gcTime: 1000 * 60 * 10, // 10분 동안 가비지 컬렉션 방지
  });
};
