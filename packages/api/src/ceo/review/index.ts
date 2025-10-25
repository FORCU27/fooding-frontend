import { GetReviewParams, GetReviewResponse } from './type';
import { api } from '../../shared';

export * from './type';
export * from './mock';

const ENDPOINT = '/ceo/review';

export const reviewApi = {
  getReviews: async (params: GetReviewParams) => {
    const response = await api.get(ENDPOINT, { params });
    return GetReviewResponse.parse(response);
  },
};
