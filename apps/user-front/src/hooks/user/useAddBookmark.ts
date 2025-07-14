import { queryKeys } from '@repo/api/configs/query-keys';
import { GetStoreListResponse, userApi } from '@repo/api/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [queryKeys.user.bookmark, 'create'],
    mutationFn: (storeId: number) => userApi.createBookmarkStore(storeId),

    onMutate: async (storeId: number) => {
      await queryClient.cancelQueries({ queryKey: [queryKeys.user.store.list] });
      const data = queryClient.getQueriesData<GetStoreListResponse['data']>({
        queryKey: [queryKeys.user.store.list],
      });

      for (const [queryKey, previousStoreList] of data) {
        if (!previousStoreList) continue;

        queryClient.setQueryData<GetStoreListResponse['data']>(queryKey, {
          ...previousStoreList,
          list: previousStoreList.list.map((store) =>
            store.id === storeId ? { ...store, isBookmarked: true } : store,
          ),
        });
      }

      return { data };
    },

    onError: (_error, _, context) => {
      if (context?.data) {
        for (const [queryKey, previousStoreList] of context.data) {
          if (!previousStoreList) continue;
          queryClient.setQueryData<GetStoreListResponse['data']>(queryKey, previousStoreList);
        }
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user.bookmark] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.user.store.list] });
    },
  });
};
