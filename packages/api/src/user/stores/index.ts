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
  GetStoreRewardListResponse,
  SearchStoreListParams,
  SearchStoreListResponse,
} from './type';
import { api } from '../../shared';

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
  searchStoreList: async (params: SearchStoreListParams) => {
    const response = await api.get(`${ENDPOINT}/elastic-search`, { params });
    return SearchStoreListResponse.parse(response);
  },
};
