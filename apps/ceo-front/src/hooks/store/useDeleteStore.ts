import { storeApi } from '@repo/api/ceo';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: storeApi.deleteStore,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['stores'] });
    },
  });
};
