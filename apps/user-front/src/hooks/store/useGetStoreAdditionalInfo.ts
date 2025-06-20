import { queryKeys } from '@repo/api/configs/query-keys';
import { storeApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetStoreAdditionalInfo = (id: number) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.store.additionalInfo, id],
    queryFn: async () => {
      const response = await storeApi.getStoreAdditionalInfo(id);
      return response.data;
    },
  });
};
