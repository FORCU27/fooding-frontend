export * from './type';

import { UserRetrieveReviewRequest, GetMyReviewListResponse } from './type';
import { api } from '../../shared';

const ENDPOINT = '/user/my';

export const reviewApi = {
  getMyReviewList: async (params: UserRetrieveReviewRequest) => {
    const response = await api.get(`${ENDPOINT}/reviews`, { params });
    return GetMyReviewListResponse.parse(response);
  },
};
