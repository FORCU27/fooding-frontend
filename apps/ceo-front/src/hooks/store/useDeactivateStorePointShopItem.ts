import { storeApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeactivateStorePointShopItem = (storeId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => storeApi.updateStorePointShopItemInactive(storeId, id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.pointShop.list, storeId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.pointShop.detail, storeId, id],
      });
    },
  });
};
