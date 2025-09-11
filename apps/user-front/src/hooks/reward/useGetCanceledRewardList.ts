import { queryKeys } from '@repo/api/configs/query-keys';
import { rewardApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetCanceledRewardList = (storeId: number) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.reward.list, storeId],
    queryFn: async () => {
      const response = await rewardApi.getCanceledRewardByStoreId(storeId);
      return response.data;
    },
  });
};
