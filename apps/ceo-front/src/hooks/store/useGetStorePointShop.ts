import { PointShop, storeApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

interface UseGetStorePointShopParams {
  id: string;
  storeId: string;
  enabled?: boolean;
}

export const useGetStorePointShop = ({
  id,
  storeId,
  enabled = true,
}: UseGetStorePointShopParams) => {
  return useQuery<PointShop>({
    queryKey: [queryKeys.ceo.pointShop.detail, storeId, id],
    queryFn: async () => {
      const response = await storeApi.getStorePointShopItemById(storeId, id);
      return response.data;
    },
    enabled,
  });
};
