import { queryKeys } from '@repo/api/configs/query-keys';
import { GetMyReviewListRequest, GetMyReviewResponse, reviewApi } from '@repo/api/user';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const getMyReviewListQueryOptions = (params: GetMyReviewListRequest) =>
  queryOptions<GetMyReviewResponse>({
    queryKey: [queryKeys.user.me.review, params],
    queryFn: async () => {
      const response = await reviewApi.getMyReviewList(params);
      return response.data;
    },
  });

export const useGetMyReviewList = (params: GetMyReviewListRequest) => {
  return useSuspenseQuery<GetMyReviewResponse>(getMyReviewListQueryOptions(params));
};
