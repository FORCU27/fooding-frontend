import { queryKeys } from '@repo/api/configs/query-keys';
import { storeWaitingApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetStoreWaitingDetail = (id: number) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.storeWaiting.detail, id],
    queryFn: async () => {
      const response = await storeWaitingApi.getWaitingById(id);
      return response.data;
    },
  });
};
