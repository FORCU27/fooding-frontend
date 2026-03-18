import { queryKeys } from '@repo/api/configs/query-keys';
import { storeApi } from '@repo/api/user';
import { useQuery } from '@tanstack/react-query';

export const useGetStoreInfo = (id?: number) => {
  return useQuery({
    queryKey: [queryKeys.user.store.detail, id],
    queryFn: async () => {
      if (!id) return undefined;
      const response = await storeApi.getStoreById(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
