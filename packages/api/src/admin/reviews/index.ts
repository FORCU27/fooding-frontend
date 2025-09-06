export * from './type';

import {
  AdminCreateReviewRequest,
  AdminReviewRequest,
  AdminUpdateReviewRequest,
  GetReviewListResponse,
  GetReviewDetailResponse,
} from './type';
import { api } from '../../shared';

export const reviewApi = {
  getReviewList: async (params: AdminReviewRequest) => {
    const response = await api.get('/admin/review', { params });
    return GetReviewListResponse.parse(response);
  },

  getReviewDetail: async (id: number) => {
    const response = await api.get(`/admin/review/${id}`);
    return GetReviewDetailResponse.parse(response);
  },

  createReview: async (data: AdminCreateReviewRequest) => 
    api.post('/admin/review', data),

  updateReview: async ({ id, body }: { id: number; body: AdminUpdateReviewRequest }) =>
    api.patch(`/admin/review/${id}`, body),

  deleteReview: async ({ id, deletedBy }: { id: number; deletedBy: number }) =>
    api.delete(`/admin/review/${id}`, { params: { deletedBy } }),
};