import { queryKeys } from '@repo/api/configs/query-keys';
import { reviewApi } from '@repo/api/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewApi.createReview,
    mutationKey: [queryKeys.user.store.review, 'create'],
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user.store.review, variables.storeId] });
    },
  });
};
