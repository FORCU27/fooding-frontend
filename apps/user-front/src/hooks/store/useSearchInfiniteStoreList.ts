import { queryKeys } from '@repo/api/configs/query-keys';
import { SearchStoreListParams, storeApi } from '@repo/api/user';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

export const useSearchInfiniteStoreList = (params: {
  keyword: SearchStoreListParams['searchString'];
  sortType: SearchStoreListParams['sortType'];
  sortDirection: SearchStoreListParams['sortDirection'];
}) => {
  const { data, fetchNextPage } = useSuspenseInfiniteQuery({
    initialPageParam: 1,
    queryKey: [queryKeys.user.store.searchInfiniteStoreList, params],
    queryFn: ({ pageParam }) => {
      return storeApi.searchStoreList({
        pageNum: pageParam,
        pageSize: 10,
        searchString: params.keyword,
        sortType: params.sortType,
        sortDirection: params.sortDirection,
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
