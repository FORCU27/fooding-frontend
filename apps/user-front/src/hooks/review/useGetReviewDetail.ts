import { queryKeys } from '@repo/api/configs/query-keys';
import { reviewApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetReviewDetail = (reviewId: number) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.review.detail, reviewId],
    queryFn: async () => {
      const response = await reviewApi.getReviewDetail(reviewId);
      return response.data;
    },
  });
};
