import { useMutation, useQueryClient } from '@tanstack/react-query';
import { menuApi, CreateMenuBody } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';

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