import { keywordsApi } from '@repo/api/user';
import { useSuspenseQuery } from '@tanstack/react-query';

import { GetRecommendedKeywordsParams } from '../../../../../packages/api/src/user/keywords/type';

export const useGetRecommendedKeywords = (params: GetRecommendedKeywordsParams) => {
  return useSuspenseQuery({
    queryKey: ['recommendedKeywords', params],
    queryFn: async () => {
      const response = await keywordsApi.getRecommendedKeywords(params);
      return response.data;
    },
  });
};
