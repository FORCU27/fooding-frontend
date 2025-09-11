import { queryKeys } from '@repo/api/configs/query-keys';
import { GetRewardListParams, rewardApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetRewardPersonalLog = (params?: GetRewardListParams) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.reward.log, params],
    queryFn: async () => {
      const response = await rewardApi.getRewardPersonalLog({
        ...params,
      });
      return response.data;
    },
  });
};
