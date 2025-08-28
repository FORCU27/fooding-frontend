import { queryKeys } from '@repo/api/configs/query-keys';
import { bookmarkApi, GetBookmarkStoreListParams } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetBookmarkList = (params?: GetBookmarkStoreListParams) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.bookmark.list, params],
    queryFn: async () => {
      const response = await bookmarkApi.getBookmarkedStoreList({
        ...params,
      });
      return response.data;
    },
  });
};
