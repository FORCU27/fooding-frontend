import { queryKeys } from '@repo/api/configs/query-keys';
import { storeApi } from '@repo/api/user';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

export const useGetInfiniteStoreImageList = ({ storeId }: { storeId: number }) => {
  const { data, fetchNextPage } = useSuspenseInfiniteQuery({
    initialPageParam: 1,
    queryKey: [queryKeys.user.store.infiniteImageList],
    queryFn: ({ pageParam }) => {
      return storeApi.getStoreImageList({
        id: storeId,
        params: {
          pageNum: pageParam,
          pageSize: 20,
          searchString: '',
          searchTag: '',
        },
      });
    },
    getNextPageParam: (lastPage) => {
      const { pageInfo } = lastPage.data;

      if (pageInfo.pageNum < pageInfo.totalPages) {
        return pageInfo.pageNum + 1;
      }

      return undefined;
    },
    staleTime: 0,
  });

  const images = data.pages.flatMap((page) => page.data.list);

  return {
    images,
    fetchNextPage,
  };
};
