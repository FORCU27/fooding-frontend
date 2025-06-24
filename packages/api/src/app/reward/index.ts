export * from './type';

import {
  UserCouponsResponse,
  UserRewardLogsResponse,
  UserRewardsLogRequest,
  UserRewardsCouponsRequest,
} from './type';
import { api } from '../../shared';

const ENDPOINT = '/app/rewards';

export const rewardApi = {
  getLog: async (params: UserRewardsLogRequest) => {
    const response = await api.get(`${ENDPOINT}/log`, { params });
    return UserRewardLogsResponse.parse(response);
  },
  getCoupons: async (params: UserRewardsCouponsRequest) => {
    const response = await api.get(`${ENDPOINT}/coupons`, { params });
    return UserCouponsResponse.parse(response);
  },
  postCoupon: (id: number) => {
    return api.post(`${ENDPOINT}/coupons/${id}`);
  },
};
