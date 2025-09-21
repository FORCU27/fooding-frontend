import { useMutation, useQueryClient } from '@tanstack/react-query';
import { menuApi, UpdateMenuBody } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';

export const useUpdateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: UpdateMenuBody }) =>
      menuApi.updateMenu(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.menu.list],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.menu.detail],
      });
    },
  });
};