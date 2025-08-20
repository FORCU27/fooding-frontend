import { queryKeys } from '@repo/api/configs/query-keys';
import { storeApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetStoreRewardList = (id: number) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.store.rewardList, id],
    queryFn: async () => {
      const response = await storeApi.getStoreRewardList(id);
      return response.data;
    },
  });
};
