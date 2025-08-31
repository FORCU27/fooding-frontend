import { queryKeys } from '@repo/api/configs/query-keys';
import { rewardApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetEarnedRewardList = (storeId: number) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.reward.list, storeId],
    queryFn: async () => {
      const response = await rewardApi.getEarnedRewardByStoreId(storeId);
      return response.data;
    },
  });
};
