import { CreateStorePointShopItemBody, storeApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateStorePointShopItem = (storeId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: number; body: CreateStorePointShopItemBody }) =>
      storeApi.updateStorePointShopItem(storeId, params.id, params.body),

    onSuccess: (_, variables) => {
      const { id } = variables;
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.pointShop.list, storeId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.pointShop.detail, storeId, id],
      });
    },
  });
};
