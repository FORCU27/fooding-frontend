export * from './type';
export * from './mock';

import { ApplyCouponBody, GetMyCouponListParams, GetMyCouponListResponse } from './type';
import { api } from '../../shared';

const ENDPOINT = '/user/coupons';

export const couponApi = {
  getMyCouponList: async (params: GetMyCouponListParams) => {
    const response = await api.get(ENDPOINT, { params });
    return GetMyCouponListResponse.parse(response);
  },
  applyCoupon: async ({ id, body }: { id: number; body: ApplyCouponBody }) => {
    await api.post(`${ENDPOINT}/${id}/request`, body);
  },
};
