import { GetReviewParams, GetReviewResponse, PostReviewReplyParams } from './type';
import { api } from '../../shared';

export * from './type';

const ENDPOINT = '/ceo/review';

export const reviewApi = {
  getReviews: async (params: GetReviewParams) => {
    const response = await api.get(ENDPOINT, { params });
    return GetReviewResponse.parse(response);
  },
  createReply: async (body: PostReviewReplyParams) => {
    await api.post(`${ENDPOINT}`, body);
  },
  editReply: async (id: number, body: { content: string }) => {
    await api.patch(`${ENDPOINT}/${id}`, body);
  },
};
