export * from './type';

import {
  AdminCreateCouponRequest,
  AdminUpdateCouponRequest,
  AdminCouponSearchParams,
  GetCouponListResponse,
  GetCouponResponse,
} from './type';
import { api } from '../../shared';

const ENDPOINT = '/admin/coupons';

export const couponApi = {
  list: async (params?: AdminCouponSearchParams) => {
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
    if (params?.status) {
      searchParams.set('status', params.status);
    }
    if (typeof params?.storeId === 'number') {
      searchParams.set('storeId', params.storeId.toString());
    }

    const queryString = searchParams.toString();
    const response = await api.get(`${ENDPOINT}${queryString ? `?${queryString}` : ''}`);
    return GetCouponListResponse.parse(response);
  },

  retrieve: async (id: number) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return GetCouponResponse.parse(response);
  },

  create: async (body: AdminCreateCouponRequest) => {
    return api.post(ENDPOINT, body);
  },

  update: async (id: number, body: AdminUpdateCouponRequest) => {
    return api.put(`${ENDPOINT}/${id}`, body);
  },

  delete: async (id: number) => {
    return api.delete(`${ENDPOINT}/${id}`);
  },
};
