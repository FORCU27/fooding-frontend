export * from './type';

import {
  AdminGiftCouponRequest,
  AdminIssueCouponRequest,
  AdminUserCouponSearchParams,
  GetAdminUserCouponListResponse,
  GetAdminUserCouponResponse,
} from './type';
import { api } from '../../shared';

const ENDPOINT = '/admin/user-coupons';

export const adminUserCouponApi = {
  list: async (params?: AdminUserCouponSearchParams) => {
    const searchParams = new URLSearchParams();

    if (params?.pageNum) {
      searchParams.set('pageNum', params.pageNum.toString());
    }
    if (params?.pageSize) {
      searchParams.set('pageSize', params.pageSize.toString());
    }
    if (params?.searchString) {
      searchParams.set('searchString', params.searchString);
    }
    if (typeof params?.userId === 'number') {
      searchParams.set('userId', params.userId.toString());
    }
    if (typeof params?.storeId === 'number') {
      searchParams.set('storeId', params.storeId.toString());
    }
    if (typeof params?.couponId === 'number') {
      searchParams.set('couponId', params.couponId.toString());
    }
    if (params?.status) {
      searchParams.set('status', params.status);
    }

    const queryString = searchParams.toString();
    const response = await api.get(`${ENDPOINT}${queryString ? `?${queryString}` : ''}`);
    return GetAdminUserCouponListResponse.parse(response);
  },

  retrieve: async (id: number) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return GetAdminUserCouponResponse.parse(response);
  },

  issue: async (body: AdminIssueCouponRequest) => {
    return api.post(ENDPOINT, body);
  },

  issueByGift: async (body: AdminGiftCouponRequest) => {
    return api.post(`${ENDPOINT}/gift`, body);
  },

  delete: async (id: number) => {
    return api.delete(`${ENDPOINT}/${id}`);
  },
};
