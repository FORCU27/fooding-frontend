import { storeInformationApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteStoreInformation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storeId, informationId }: { storeId: number; informationId: number }) => {
      return storeInformationApi.deleteStoreInformation(storeId, informationId);
    },

    onSuccess: (_, variables) => {
      // 성공 시 해당 store 정보 무효화하여 재조회
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.storeInformation.get, variables.storeId],
      });
    },

    onError: () => {},
  });
};
