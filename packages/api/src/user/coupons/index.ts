export * from './type';

import { GetMyCouponListParams, GetMyCouponListResponse } from './type';
import { api } from '../../shared';

const ENDPOINT = '/user/coupons';

export const couponApi = {
  getMyCouponList: async (params: GetMyCouponListParams) => {
    const response = await api.get(ENDPOINT, { params });
    return GetMyCouponListResponse.parse(response);
  },
  useCoupon: async (id: number) => {
    await api.post(`${ENDPOINT}/${id}/request`);
  },
};
