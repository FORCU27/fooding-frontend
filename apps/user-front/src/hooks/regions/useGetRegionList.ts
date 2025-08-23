import { queryKeys } from '@repo/api/configs/query-keys';
import { GetRegionListParams, regionApi } from '@repo/api/user';
import { useQuery } from '@tanstack/react-query';

export const useGetRegionList = (params: GetRegionListParams) => {
  return useQuery({
    queryKey: [queryKeys.user.region.list, params],
    queryFn: async () => {
      const data = await regionApi.getRegionList(params);
      return data.data;
    },
    placeholderData: (previousData) => previousData, // fetch 중 이전 데이터 유지
  });
};
