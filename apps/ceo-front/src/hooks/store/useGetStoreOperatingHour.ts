import { storeApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useGetStoreOperatingHour = (id: number) => {
  return useQuery({
    queryKey: [queryKeys.ceo.store.operatingHour, id],
    queryFn: async () => {
      const result = await storeApi.getStoreOperatingHour(id);
      return result.data;
    },
    staleTime: 0,
  });
};
