import { queryKeys } from '@repo/api/configs/query-keys';
import { storeApi } from '@repo/api/user';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const usePurchaseStoreReward = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storeId, rewardId }: { storeId: number; rewardId: number }) =>
      storeApi.purchaseStoreReward(storeId, rewardId),
    mutationKey: [queryKeys.user.store.reward],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user.store.reward] });
    },
  });
};
