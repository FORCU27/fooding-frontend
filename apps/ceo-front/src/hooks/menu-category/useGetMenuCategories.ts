import { menuCategoryApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useGetMenuCategories = (storeId: number | null) => {
  return useQuery({
    queryKey: [queryKeys.ceo.menuCategory.list, storeId],
    queryFn: async () => {
      if (!storeId) throw new Error('Store ID is required');
      const response = await menuCategoryApi.getMenuCategories(storeId);
      return response.data;
    },
    enabled: !!storeId,
  });
};