import { storeInformationApi, StoreInformationBody } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateStoreInformation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storeId, informationId, body }: { storeId: number; informationId: number; body: StoreInformationBody }) => {
      return storeInformationApi.updateStoreInformation(storeId, informationId, body);
    },

    onSuccess: (_, variables) => {
      // 성공 시 해당 store 정보 무효화하여 재조회
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.storeInformation.get, variables.storeId],
      });

      console.log('부가정보 업데이트 완료');
    },

    onError: (error: unknown) => {
      console.error('부가정보 업데이트 실패:', error);
    },
  });
};