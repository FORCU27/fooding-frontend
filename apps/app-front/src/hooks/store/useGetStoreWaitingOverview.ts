import { queryKeys } from '@repo/api/configs/query-keys';
import { storeApi } from '@repo/api/app';
import { useQuery } from '@tanstack/react-query';

export const useGetStoreWaitingOverview = (storeId: number) => {
  return useQuery({
    queryKey: [queryKeys.app.store.waitingOverview, storeId],
    queryFn: async () => {
      const response = await storeApi.getStoreWaitingOverview({ id: storeId });
      return response.data;
    },
    enabled: storeId > 0, // storeId가 유효할 때만 실행
    retry: false, // 403 오류 시 재시도하지 않음
    refetchInterval: 10000, // 10초마다 자동 새로고침 (밀리초 단위)
  });
};
