import { rewardApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useStoreRewardHistory = (storeId: number) => {
  return useQuery({
    queryKey: [queryKeys.ceo.reward.history, storeId],
    queryFn: () => rewardApi.getStoreRewardHistory(storeId),
    enabled: !!storeId,
  });
};
