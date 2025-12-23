import { queryKeys } from '@repo/api/configs/query-keys';
import { reviewApi } from '@repo/api/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: number) => {
      const response = await reviewApi.deleteReview(reviewId);
      return response.data;
    },
    onSuccess: (_, reviewId) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user.store.review, reviewId] });
    },
  });
};
