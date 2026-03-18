import { PointShop, storeApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

interface UseGetStorePointShopParams {
  id: number;
  storeId: number;
}

export const useGetStorePointShopItem = ({ id, storeId }: UseGetStorePointShopParams) => {
  return useQuery<PointShop>({
    queryKey: [queryKeys.ceo.pointShop.detail, storeId, id],

    queryFn: async () => {
      const response = await storeApi.getStorePointShopItemById(storeId, id);
      return response.data;
    },

    enabled: !!storeId && storeId > 0 && !!id,
  });
};
