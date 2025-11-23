import { queryKeys } from '@repo/api/configs/query-keys';
import { storeApi } from '@repo/api/user';
import { infiniteQueryOptions, useSuspenseInfiniteQuery } from '@tanstack/react-query';

const infiniteStoreImageListQueryOptions = ({ storeId }: { storeId: number }) =>
  infiniteQueryOptions({
    initialPageParam: 1,
    queryKey: [queryKeys.user.store.infiniteImageList],
    queryFn: ({ pageParam }) =>
      storeApi.getStoreImageList({
        id: storeId,
        params: {
          pageNum: pageParam,
          pageSize: 20,
          searchString: '',
          searchTag: '',
        },
      }),
    getNextPageParam: (lastPage) => {
      const { pageInfo } = lastPage.data;

      if (pageInfo.pageNum < pageInfo.totalPages) {
        return pageInfo.pageNum + 1;
      }

      return undefined;
    },
  });

export const useGetInfiniteStoreImageList = ({ storeId }: { storeId: number }) => {
  const { data, fetchNextPage, isPending, isFetching, isFetchingNextPage } =
    useSuspenseInfiniteQuery(infiniteStoreImageListQueryOptions({ storeId }));

  const images = data.pages.flatMap((page) => page.data.list);

  return {
    images,
    fetchNextPage,
    isPending,
    isFetching,
    isFetchingNextPage,
  };
};
