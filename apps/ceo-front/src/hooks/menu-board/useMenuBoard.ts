import { menuBoardApi, MenuBoardListParams } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetMenuBoards = (storeId: number | null, params?: MenuBoardListParams) => {
  return useQuery({
    queryKey: [queryKeys.ceo.menuBoard.list, { storeId, ...params }],
    queryFn: () => menuBoardApi.getMenuBoards(storeId!, params),
    enabled: !!storeId,
  });
};

export const useCreateMenuBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storeId, ...data }: { storeId: number; title: string; imageId: string }) =>
      menuBoardApi.createMenuBoard(storeId, data),
    onSuccess: (_, { storeId }) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.menuBoard.list, { storeId }],
      });
    },
  });
};

export const useDeleteMenuBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storeId, menuBoardId }: { storeId: number; menuBoardId: number }) =>
      menuBoardApi.deleteMenuBoard(storeId, menuBoardId),
    onSuccess: (_, { storeId }) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.menuBoard.list, { storeId }],
      });
    },
  });
};