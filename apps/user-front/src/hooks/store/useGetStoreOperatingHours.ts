import { queryKeys } from '@repo/api/configs/query-keys';
import { storeApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetStoreOperatingHours = (id: number) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.store.operatingHours, id],
    queryFn: async () => {
      const response = await storeApi.getStoreOperatingHours(id);
      return response.data;
    },
  });
};
