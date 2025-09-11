import { queryKeys } from '@repo/api/configs/query-keys';
import { SearchStoreListParams, storeApi } from '@repo/api/user';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

export const useInfiniteSearchStoreList = (
  params: Omit<SearchStoreListParams, 'pageNum' | 'pageSize'>,
) => {
  const { data, fetchNextPage } = useSuspenseInfiniteQuery({
    initialPageParam: 1,
    queryKey: [queryKeys.user.store.infiniteSearchStoreList],
    queryFn: ({ pageParam }) => {
      return storeApi.searchStoreList({
        pageNum: pageParam,
        pageSize: 10,
        ...params,
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

  const stores = data.pages.flatMap((page) => page.data.list);

  return {
    stores,
    totalCount: data.pages[0]?.data.pageInfo.totalCount ?? 0,
    fetchNextPage,
  };
};
