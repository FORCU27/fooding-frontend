export * from './type';

import { api } from '../../shared';
import { CreateReportBody, GetUserReportResponse } from '../reports';
import { GetStoreReviewListResponse as GetReviewListResponse } from '../stores';
import {
  CreateReviewBody,
  GetMyReviewListRequest,
  GetMyReviewResponse,
  GetReviewListRequest,
  GetReviewResponse,
  ModifyReviewBody,
} from './type';

const ENDPOINT = '/user/reviews';

export const reviewApi = {
  getMyReviewList: async (params: GetMyReviewListRequest) => {
    const response = await api.get('/user/my/reviews', { params });
    return GetMyReviewResponse.parse(response);
  },
  getReviewList: async ({ id, params }: GetReviewListRequest) => {
    const response = await api.get(`${ENDPOINT}/${id}/reviews`, { params });
    return GetReviewListResponse.parse(response);
  },

  modifyReview: async ({ reviewId, body }: { reviewId: number; body: ModifyReviewBody }) => {
    const response = await api.patch(`${ENDPOINT}/${reviewId}/update`, body);
    return GetReviewResponse.parse(response);
  },
  deleteReview: async (reviewId: number) => {
    const response = await api.delete(`${ENDPOINT}/${reviewId}`);
    return GetReviewResponse.parse(response);
  },
  createReviewReport: async (reviewId: number, body: CreateReportBody) => {
    const response = await api.post(`${ENDPOINT}/${reviewId}/report`, body);
    return GetUserReportResponse.parse(response);
  },
  createReview: async (body: CreateReviewBody) => {
    await api.post(`${ENDPOINT}/reviews`, body);
  },
};
