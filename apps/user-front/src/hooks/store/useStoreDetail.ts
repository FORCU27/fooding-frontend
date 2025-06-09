import { queryKeys } from '@repo/api/configs/query-keys';
import { storeApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useStoreDetail = (id: number) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.storeInfo, id],
    queryFn: () => storeApi.getStoreById(id),
  });
};
