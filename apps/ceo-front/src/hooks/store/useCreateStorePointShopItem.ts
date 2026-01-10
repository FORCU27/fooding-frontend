import { CreateStorePointShopItemBody, storeApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateStorePointShopItem = (storeId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateStorePointShopItemBody) =>
      storeApi.createStorePointShopItem(storeId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.pointShop.list, storeId],
      });
    },
  });
};
