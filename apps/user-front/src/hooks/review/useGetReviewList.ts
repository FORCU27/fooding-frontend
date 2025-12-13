import { queryKeys } from '@repo/api/configs/query-keys';
import { reviewApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetReviewList = (id: number) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.store.reviewList, id],
    queryFn: async () => {
      const response = await reviewApi.getReviewList({
        id,
        params: {
          sortType: 'RECENT',
          sortDirection: 'DESCENDING',
          pageNum: 1,
          pageSize: 10,
        },
      });
      return response.data;
    },
  });
};
