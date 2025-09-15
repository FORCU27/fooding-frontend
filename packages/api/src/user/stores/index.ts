export * from './type';
export * from './mock';

import {
  CreateStoreReviewBody,
  GetStoreAdditionalInfoResponse,
  GetStoreByIdResponse,
  GetStoreImageListRequest,
  GetStoreImageListResponse,
  GetStoreListParams,
  GetStoreListResponse,
  GetStoreMenuListResponse,
  GetStoreOperatingHoursResponse,
  GetStoreReviewListRequest,
  GetStoreReviewListResponse,
  GetStoreReviewResponse,
  GetStoreRewardListResponse,
  ModifyStoreReviewBody,
} from './type';
import { api } from '../../shared';
import { CreateReportBody, GetUserReportResponse } from '../reports';

const ENDPOINT = '/user/stores';

export const storeApi = {
  getStoreList: async (params: GetStoreListParams) => {
    const response = await api.get(ENDPOINT, { params });
    return GetStoreListResponse.parse(response);
  },
  getStoreById: async (id: number) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return GetStoreByIdResponse.parse(response);
  },
  getStoreAdditionalInfo: async (id: number) => {
    const response = await api.get(`${ENDPOINT}/${id}/information`);
    return GetStoreAdditionalInfoResponse.parse(response);
  },
  getStoreOperatingHours: async (id: number) => {
    const response = await api.get(`${ENDPOINT}/${id}/operating-hour`);
    return GetStoreOperatingHoursResponse.parse(response);
  },
  getStoreMenuList: async (id: number) => {
    const response = await api.get(`${ENDPOINT}/${id}/menus`);
    return GetStoreMenuListResponse.parse(response);
  },
  getStoreReviewList: async ({ id, params }: GetStoreReviewListRequest) => {
    const response = await api.get(`${ENDPOINT}/${id}/reviews`, { params });
    return GetStoreReviewListResponse.parse(response);
  },
  getStoreImageList: async ({ id, params }: GetStoreImageListRequest) => {
    const response = await api.get(`${ENDPOINT}/${id}/images`, { params });
    return GetStoreImageListResponse.parse(response);
  },
  createStoreReview: async (body: CreateStoreReviewBody) => {
    await api.post(`${ENDPOINT}/reviews`, body);
  },
  modifyStoreReview: async (reviewId: number, body: ModifyStoreReviewBody) => {
    const response = await api.patch(`${ENDPOINT}/${reviewId}/update`, body);
    return GetStoreReviewResponse.parse(response);
  },
  deleteStoreReview: async (reviewId: number) => {
    const response = await api.delete(`${ENDPOINT}/${reviewId}`);
    return GetStoreReviewResponse.parse(response);
  },
  getStoreImmediateEntryList: async (params: GetStoreListParams) => {
    const response = await api.get(`${ENDPOINT}/immediate-entry`, { params });
    return GetStoreListResponse.parse(response);
  },
  getStoreRewardList: async (storeId: number) => {
    const response = await api.get(`${ENDPOINT}/${storeId}/rewards`);
    return GetStoreRewardListResponse.parse(response);
  },
  purchaseStoreReward: async (storeId: number, id: number) => {
    return await api.post(`${ENDPOINT}/${storeId}/rewards/${id}`);
  },
  createStoreReviewReport: async (reviewId: number, body: CreateReportBody) => {
    const response = await api.post(`${ENDPOINT}/${reviewId}/report`, body);
    return GetUserReportResponse.parse(response);
  },
};
