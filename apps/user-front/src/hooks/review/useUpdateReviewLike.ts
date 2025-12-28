import { queryKeys } from '@repo/api/configs/query-keys';
import { reviewApi, Review } from '@repo/api/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateReviewLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: number) => reviewApi.updateLikeStatus(reviewId),

    onMutate: async (reviewId) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeys.user.store.review],
      });

      const previousData = queryClient.getQueryData<Review>([
        queryKeys.user.store.review,
        reviewId,
      ]);

      // optimistic update (상세)
      if (previousData) {
        queryClient.setQueryData<Review>([queryKeys.user.store.review, reviewId], {
          ...previousData,
          likeCount: previousData.likeCount + 1,
        });
      }

      return { previousData };
    },

    onError: (_err, reviewId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([queryKeys.user.store.review, reviewId], context.previousData);
      }
    },

    onSettled: (_data, _error, reviewId) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.user.store.review, reviewId],
      });

      queryClient.invalidateQueries({
        queryKey: [queryKeys.user.store.review],
      });
    },
  });
};
