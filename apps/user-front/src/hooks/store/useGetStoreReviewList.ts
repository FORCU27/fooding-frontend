import { queryKeys } from '@repo/api/configs/query-keys';
import { storeApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetStoreReviewList = (id: number) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.store.reviewList, id],
    queryFn: async () => {
      const response = await storeApi.getStoreReviewList({
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
