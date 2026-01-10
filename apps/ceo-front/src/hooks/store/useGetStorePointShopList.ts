import { storeApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

interface UseGetStorePointShopListParams {
  storeId: number;
  isActive?: boolean;
  sortType?: string;
  pageSize?: number;
}

export const useGetStorePointShopList = ({
  storeId,
  isActive,
  pageSize = 100,
  sortType = 'RECENT',
}: UseGetStorePointShopListParams) => {
  return useQuery({
    queryKey: [queryKeys.ceo.pointShop.list, storeId, isActive, pageSize, sortType],
    queryFn: async () => {
      const response = await storeApi.getStorePointShopList(storeId, {
        isActive,
        pageSize,
        sortType,
      });

      return response.data;
    },
    enabled: !!storeId && storeId > 0,
  });
};
