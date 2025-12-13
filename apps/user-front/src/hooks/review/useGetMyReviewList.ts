import { queryKeys } from '@repo/api/configs/query-keys';
import { GetMyReviewListRequest, GetMyReviewResponse, reviewApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetMyReviewList = (params: GetMyReviewListRequest) => {
  return useSuspenseQuery<GetMyReviewResponse>({
    queryKey: [queryKeys.user.me.review, params],
    queryFn: async () => {
      const response = await reviewApi.getMyReviewList(params);
      return response.data;
    },
  });
};
