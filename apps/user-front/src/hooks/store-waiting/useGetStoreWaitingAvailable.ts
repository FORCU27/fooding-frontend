import { storeApi } from '@repo/api/app';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetStoreWaitingAvailable = (storeId: number) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.storeWaiting.available, storeId],
    queryFn: async () => {
      const response = await storeApi.getUserWaitingAvailable(storeId);
      return response.data;
    },
  });
};