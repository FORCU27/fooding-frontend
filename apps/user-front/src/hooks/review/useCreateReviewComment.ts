import { queryKeys } from '@repo/api/configs/query-keys';
import { CreateReviewCommentBody, reviewApi } from '@repo/api/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateReviewComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, body }: { reviewId: number; body: CreateReviewCommentBody }) =>
      reviewApi.createReivewComment(reviewId, body),
    mutationKey: [queryKeys.user.store.review, 'comment'],
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.user.store.review, variables.reviewId],
      });
    },
  });
};
