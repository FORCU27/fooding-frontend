import { storeApi } from '@repo/api/app';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useGetWaitingList = (storeId: number) => {
  const isClient = typeof window !== 'undefined';

  return useQuery({
    queryKey: [queryKeys.app.store.waitingList, storeId],
    queryFn: async () => {
      const result = await storeApi.getWaitingList({
        storeId,
        status: 'WAITING',
        pageSize: 50,
      });
      return result;
    },
    staleTime: 5000, // 5초 주기로 갱신
    refetchInterval: 5000, // 5초마다 자동 갱신
    enabled: isClient && !!storeId,
  });
};
