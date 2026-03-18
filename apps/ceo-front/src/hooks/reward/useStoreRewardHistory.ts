import { rewardApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useStoreRewardHistory = (
  storeId: number,
  sortType?: 'RECENT' | 'OLD',
) => {
  return useQuery({
    queryKey: [queryKeys.ceo.reward.history, storeId, sortType],
    queryFn: () => rewardApi.getStoreRewardHistory({ storeId, sortType }),
    enabled: !!storeId,
  });
};
