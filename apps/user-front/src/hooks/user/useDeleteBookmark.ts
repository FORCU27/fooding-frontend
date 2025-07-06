import { queryKeys } from '@repo/api/configs/query-keys';
import { GetBookmarkStoreListResponse, GetStoreListResponse, userApi } from '@repo/api/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (storeId: number) => userApi.deleteBookmarkStore(storeId),

    onMutate: async (storeId: number) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: [queryKeys.user.bookmark] }),
        queryClient.cancelQueries({ queryKey: [queryKeys.user.store.list] }),
      ]);

      const previousBookmarkData = queryClient.getQueryData<GetBookmarkStoreListResponse>([
        queryKeys.user.bookmark,
      ]);

      const previousStoreList = queryClient.getQueryData<GetStoreListResponse>([
        queryKeys.user.store.list,
      ]);

      if (previousBookmarkData) {
        queryClient.setQueryData<GetBookmarkStoreListResponse>([queryKeys.user.bookmark], {
          ...previousBookmarkData,
          data: {
            ...previousBookmarkData.data,
            list: previousBookmarkData.data.list.filter((item) => item.id !== storeId),
          },
        });
      }

      if (previousStoreList) {
        queryClient.setQueryData<GetStoreListResponse>([queryKeys.user.store.list], {
          ...previousStoreList,
          data: {
            ...previousStoreList.data,
            list: previousStoreList.data.list.map((store) =>
              store.id === storeId ? { ...store, isBookmarked: false } : store,
            ),
          },
        });
      }

      return { previousBookmarkData, previousStoreList };
    },

    onError: (_error, _, context) => {
      if (context?.previousBookmarkData) {
        queryClient.setQueryData([queryKeys.user.bookmark], context.previousBookmarkData);
      }

      if (context?.previousStoreList) {
        queryClient.setQueryData([queryKeys.user.store.list], context.previousStoreList);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user.bookmark] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.user.store.list] });
    },
  });
};
