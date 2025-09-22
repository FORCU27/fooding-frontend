import { menuApi, type CreateMenuBody } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateMenuBody) => menuApi.createMenu(body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.menu.list, { storeId: variables.storeId }],
      });
    },
  });
};