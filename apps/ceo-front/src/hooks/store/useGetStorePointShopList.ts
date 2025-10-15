import { storeApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

interface UseGetStorePointShopListParams {
  storeId: string;
  isActive?: boolean;
  sortType?: string;
}

export const useGetStorePointShopList = ({
  storeId,
  sortType = 'RECENT',
  isActive = true,
}: UseGetStorePointShopListParams) => {
  return useQuery({
    queryKey: [queryKeys.ceo.pointShop.list, storeId, isActive, sortType],
    queryFn: async () => {
      const response = await storeApi.getStorePointShopList(storeId, {
        isActive,
        sortType,
      });

      return response.data;
    },
    enabled: !!storeId,
  });
};
