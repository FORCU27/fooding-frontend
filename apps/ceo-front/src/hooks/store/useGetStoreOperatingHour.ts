import { storeApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useGetStoreOperatingHour = (id: number) => {
  return useQuery({
    queryKey: [queryKeys.ceo.store.operatingHour, id],
    enabled: !!id && id > 0,
    queryFn: async () => (await storeApi.getStoreOperatingHour(id)).data,
    staleTime: 0,
  });
};
