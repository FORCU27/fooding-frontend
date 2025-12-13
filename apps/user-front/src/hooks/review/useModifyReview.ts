import { queryKeys } from '@repo/api/configs/query-keys';
import { reviewApi } from '@repo/api/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useModifyReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewApi.modifyReview,
    onSuccess: (_, { reviewId }) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user.store.review, reviewId] });
    },
  });
};
