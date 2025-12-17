import { queryKeys } from '@repo/api/configs/query-keys';
import { reviewApi, UserRetrieveReviewRequest, GetMyReviewListData } from '@repo/api/user';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const getMyReviewListQueryOptions = (params: UserRetrieveReviewRequest) =>
  queryOptions<GetMyReviewListData>({
    queryKey: [queryKeys.user.review.myList, params],
    queryFn: async () => {
      const response = await reviewApi.getMyReviewList(params);
      return response.data;
    },
  });

export const useGetMyReviewList = (params: UserRetrieveReviewRequest) => {
  return useSuspenseQuery<GetMyReviewListData>(getMyReviewListQueryOptions(params));
};
