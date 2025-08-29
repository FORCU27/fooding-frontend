import { queryKeys } from '@repo/api/configs/query-keys';
import { GetRewardListParams, rewardApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetRewardByStoreList = (params?: GetRewardListParams) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.reward.list, params],
    queryFn: async () => {
      const response = await rewardApi.getRewardByStoreList({
        ...params,
      });
      return response.data;
    },
  });
};
