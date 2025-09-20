import { bannerApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetBannerList = () => {
  return useSuspenseQuery({
    queryKey: ['user-banners'],
    queryFn: async () => {
      const response = await bannerApi.getBannerList({
        pageNum: 1,
        pageSize: 10,
        searchString: '',
      });

      return response.data.list;
    },
    staleTime: 5_000,
  });
};
