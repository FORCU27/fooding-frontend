import { queryKeys } from '@repo/api/configs/query-keys';
import { GetStorePostListParams, storePostApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetStorePostList = (params: GetStorePostListParams) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.storePost.list, params],
    queryFn: async () => {
      const response = await storePostApi.getStorePostList(params);
      return response.data;
    },
  });
};
