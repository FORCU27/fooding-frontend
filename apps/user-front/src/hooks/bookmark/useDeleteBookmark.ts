import { queryKeys } from '@repo/api/configs/query-keys';
import { bookmarkApi, GetStoreListResponse } from '@repo/api/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [queryKeys.user.bookmark.list, 'delete'],
    mutationFn: (storeId: number) => bookmarkApi.deleteBookmarkStore(storeId),

    onMutate: async (storeId: number) => {
      await queryClient.cancelQueries({ queryKey: [queryKeys.user.store.list] });

      const storeListData = queryClient.getQueriesData<GetStoreListResponse['data']>({
        queryKey: [queryKeys.user.store.list],
        exact: false,
      });

      for (const [queryKey, prevStoreList] of storeListData) {
        if (!prevStoreList) continue;

        queryClient.setQueryData<GetStoreListResponse['data']>(queryKey, {
          ...prevStoreList,
          list: prevStoreList.list.map((store) =>
            store.id === storeId ? { ...store, isBookmarked: false } : store,
          ),
        });
      }

      const bookmarkListData = queryClient.getQueriesData<GetStoreListResponse['data']>({
        queryKey: [queryKeys.user.bookmark.list],
        exact: false,
      });

      for (const [queryKey, prevBookmarkList] of bookmarkListData) {
        if (!prevBookmarkList) continue;

        queryClient.setQueryData<GetStoreListResponse['data']>(queryKey, {
          ...prevBookmarkList,
          list: prevBookmarkList.list.filter((store) => store.id !== storeId),
        });
      }

      return { storeListData, bookmarkListData };
    },

    onError: (_error, _, context) => {
      if (context?.storeListData) {
        for (const [queryKey, prevStoreList] of context.storeListData) {
          if (!prevStoreList) continue;
          queryClient.setQueryData<GetStoreListResponse['data']>(queryKey, prevStoreList);
        }
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user.bookmark.list] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.user.store.list] });
    },
  });
};
