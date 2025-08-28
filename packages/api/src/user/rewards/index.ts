export * from './type';

import {
  GetRewardListParams,
  GetUserRewardResponse as GetUserRewardByStoreResponse,
  GetUserRewardLogResponse,
  GetUserRewardPointResponse,
} from './type';
import { api } from '../../shared';

const ENDPOINT = '/user/reward';

export const rewardApi = {
  getRewardByStoreList: async (params?: GetRewardListParams) => {
    const response = await api.get(`${ENDPOINT}/store`, { params });
    return GetUserRewardByStoreResponse.parse(response);
  },
  getUsedRewardByStoreId: async (storeId: number) => {
    const response = await api.get(`${ENDPOINT}/store/${storeId}/used`);
    return GetUserRewardPointResponse.parse(response);
  },
  getEarnedRewardByStoreId: async (storeId: number) => {
    const response = await api.get(`${ENDPOINT}/store/${storeId}/earned`);
    return GetUserRewardPointResponse.parse(response);
  },
  getCanceledRewardByStoreId: async (storeId: number) => {
    const response = await api.get(`${ENDPOINT}/store/${storeId}/canceled`);
    return GetUserRewardPointResponse.parse(response);
  },

  getRewardLog: async (params?: GetRewardListParams) => {
    const response = await api.get(`${ENDPOINT}/logs`, { params });
    return GetUserRewardLogResponse.parse(response);
  },
  getRewardPersonalLog: async (params?: GetRewardListParams) => {
    const response = await api.get(`${ENDPOINT}/logs/personal`, { params });
    return GetUserRewardLogResponse.parse(response);
  },
};
