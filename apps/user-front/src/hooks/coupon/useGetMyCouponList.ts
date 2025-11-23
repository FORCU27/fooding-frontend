import { queryKeys } from '@repo/api/configs/query-keys';
import { couponApi } from '@repo/api/user';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

export const useGetInfiniteMyCouponList = (params: { used: boolean }) => {
  const { data, fetchNextPage, isPending, isFetching, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      initialPageParam: 1,
      queryKey: [queryKeys.user.coupon.infiniteList, params],
      queryFn: ({ pageParam }) => {
        return couponApi.getMyCouponList({
          pageNum: pageParam,
          used: params.used,
          pageSize: 20,
          searchString: '',
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

  const coupons = data.pages.flatMap((page) => page.data.list);

  return {
    coupons,
    totalCount: data.pages[0]?.data.pageInfo.totalCount ?? 0,
    fetchNextPage,
    isPending,
    isFetching,
    isFetchingNextPage,
  };
};
