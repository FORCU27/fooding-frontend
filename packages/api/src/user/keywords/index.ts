export * from './type';
export * from './mock';

import { GetRecommendedKeywordsParams, GetRecommendedKeywordsResponse } from './type';
import { api } from '../../shared';

const ENDPOINT = '/user/recommend-keywords';

export const keywordsApi = {
  getRecommendedKeywords: async (params: GetRecommendedKeywordsParams) => {
    const response = await api.get(ENDPOINT, { params });
    return GetRecommendedKeywordsResponse.parse(response);
  },
};
