import { queryKeys } from '@repo/api/configs/query-keys';
import { GetStoreImageListRequest, storeApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetStoreImageList = (request: GetStoreImageListRequest) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.store.imageList, request],
    queryFn: async () => {
      const response = await storeApi.getStoreImageList(request);
      return response.data;
    },
  });
};
