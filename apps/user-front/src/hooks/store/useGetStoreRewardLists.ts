import { queryKeys } from '@repo/api/configs/query-keys';
import { storeApi } from '@repo/api/user';
import { useSuspenseQueries } from '@tanstack/react-query';

export const useGetStoreRewardLists = (ids: number[]) => {
  return useSuspenseQueries({
    queries: ids.map((id) => ({
      queryKey: [queryKeys.user.store.rewardList, id],
      queryFn: async () => {
        const response = await storeApi.getStoreRewardList(id);
        return {
          storeId: id,
          ...response.data,
        };
      },
    })),
  });
};
