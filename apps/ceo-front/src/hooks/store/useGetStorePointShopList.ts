import { storeApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

interface UseGetStorePointShopListParams {
  storeId: number;
  isActive?: boolean;
}

export const useGetStorePointShopList = ({
  storeId,
  isActive = true,
}: UseGetStorePointShopListParams) => {
  return useQuery({
    queryKey: [queryKeys.ceo.store.pointShop.list, storeId, isActive],
    queryFn: async () => {
      const response = await storeApi.getStorePointShopList(storeId, {
        pageNum: 1,
        pageSize: 10,
        isActive,
      });
      return response.data;
    },
    enabled: !!storeId,
  });
};
