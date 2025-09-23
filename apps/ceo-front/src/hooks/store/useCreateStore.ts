import { storeApi } from '@repo/api/ceo';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: storeApi.createStore,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['stores'] });
    },
  });
};
