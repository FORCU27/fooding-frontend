import { queryKeys } from '@repo/api/configs/query-keys';
import { GetBookmarkStoreListParams, userApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetBookmarkList = (params?: GetBookmarkStoreListParams) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.bookmark, params],
    queryFn: async () => {
      const response = await userApi.getBookmarkedStoreList({
        ...params,
      });
      return response.data;
    },
  });
};
