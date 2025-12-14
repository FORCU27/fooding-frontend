import { storeApi, StoreOperatingHourBody } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ModifyStoreOperatingHourParams = {
  id: number;
  storeId: number;
  body: StoreOperatingHourBody;
};

export const useModifyStoreOperatingHour = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storeId, id, body }: ModifyStoreOperatingHourParams) =>
      storeApi.updateStoreOperatingHour(storeId, id, body),

    mutationKey: [queryKeys.ceo.store.operatingHour, 'update'],

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.store.operatingHour, variables.id, variables.storeId],
      });
    },
  });
};
