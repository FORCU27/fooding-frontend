import { queryKeys } from '@repo/api/configs/query-keys';
import { bannerApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetBannerList = () => {
  return useSuspenseQuery({
    queryKey: [queryKeys.user.banner.list],
    queryFn: async () => {
      const response = await bannerApi.getBannerList({
        pageNum: 1,
        pageSize: 20,
        searchString: '',
      });

      return response.data;
    },
  });
};
