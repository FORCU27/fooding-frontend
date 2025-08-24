import { storeApiV2 } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useGetStore = (id: number) => {
  const isClient = typeof window !== 'undefined';

  return useQuery({
    queryKey: [queryKeys.ceo.store.getStore, id],
    queryFn: async () => {
      const result = await storeApiV2.getStoreV2(id);
      return result;
    },
    staleTime: 0,
    enabled: isClient,
  });
};
