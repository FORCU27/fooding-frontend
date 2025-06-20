import { queryKeys } from '@repo/api/configs/query-keys';
import { storeApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetStoreMenuList = (id: number) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.store.menuList, id],
    queryFn: async () => {
      const response = await storeApi.getStoreMenuList(id);
      return response.data;
    },
  });
};
