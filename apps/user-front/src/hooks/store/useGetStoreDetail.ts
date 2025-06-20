import { queryKeys } from '@repo/api/configs/query-keys';
import { storeApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetStoreDetail = (id: number) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.store.detail, id],
    queryFn: async () => {
      const response = await storeApi.getStoreById(id);
      return response.data;
    },
  });
};
