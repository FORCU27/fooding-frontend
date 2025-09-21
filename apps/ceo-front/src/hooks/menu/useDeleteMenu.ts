import { menuApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => menuApi.deleteMenu(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.menu.list],
      });
    },
  });
};