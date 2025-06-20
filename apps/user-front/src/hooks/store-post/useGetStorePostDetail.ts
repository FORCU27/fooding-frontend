import { queryKeys } from '@repo/api/configs/query-keys';
import { storePostApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetStorePostDetail = (id: number) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.storePost.detail, id],
    queryFn: async () => {
      const response = await storePostApi.getStorePostById(id);
      return response.data;
    },
  });
};
