import { queryKeys } from '@repo/api/configs/query-keys';
import { GetRegionListParams, regionApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetRegionList = (params: GetRegionListParams) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.region.list, params],
    queryFn: async () => {
      const response = await regionApi.getRegionList(params);
      return response.data;
    },
  });
};
