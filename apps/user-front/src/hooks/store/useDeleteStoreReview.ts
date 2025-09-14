import { queryKeys } from '@repo/api/configs/query-keys';
import { storeApi } from '@repo/api/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteStoreReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: number) => {
      const response = await storeApi.deleteStoreReview(reviewId);
      return response.data;
    },
    onSuccess: (_, reviewId) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user.store.review, reviewId] });
    },
  });
};
