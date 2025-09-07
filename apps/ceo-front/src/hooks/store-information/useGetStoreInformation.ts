import { storeInformationApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useGetStoreInformation = (storeId: number | null) => {
  const isClient = typeof window !== 'undefined';

  return useQuery({
    queryKey: [queryKeys.ceo.storeInformation.get, storeId],
    queryFn: async () => {
      if (!storeId) throw new Error('Store ID is required');
      const result = await storeInformationApi.getStoreInformation(storeId);
      return result.data;
    },
    staleTime: 0, // CEO 앱은 실시간 데이터가 중요
    enabled: isClient && !!storeId, // 클라이언트 사이드에서만 실행
  });
};