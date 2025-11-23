import { GetReviewParams, GetReviewResponse, PostReviewReplyParams } from './type';
import { api } from '../../shared';

export * from './type';

const ENDPOINT = '/ceo/review';

export const reviewApi = {
  getReviews: async (params: GetReviewParams) => {
    const response = await api.get(ENDPOINT, { params });
    return GetReviewResponse.parse(response);
  },
  createReply: async (reviewId: number, body: PostReviewReplyParams) => {
    await api.post(`${ENDPOINT}/reply/${reviewId}`, body);
  },
  editReply: async (replyId: number, body: { content: string }) => {
    await api.patch(`${ENDPOINT}/reply/${replyId}`, body);
  },
  deleteReply: async (reviewId: number, deleteBy: number) => {
    await api.delete(`${ENDPOINT}/reply/${reviewId}?deleteBy=${deleteBy}`);
  },
};
