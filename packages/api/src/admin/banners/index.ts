export * from './type';

import {
  AdminBannerCreateRequest,
  AdminBannerUpdateRequest,
  AdminBannerPageRequest,
  AdminBannerResponseSchema,
  GetBannerListResponse,
  GetBannerResponse,
} from './type';
import { api } from '../../shared';

const ENDPOINT = '/admin/banners';

export const bannerApi = {
  list: async (params?: AdminBannerPageRequest) => {
    const searchParams = new URLSearchParams();
    if (params?.page !== undefined) {
      searchParams.set('page', params.page.toString());
    }
    if (params?.size !== undefined) {
      searchParams.set('size', params.size.toString());
    }
    if (params?.name) {
      searchParams.set('name', params.name);
    }
    if (params?.active !== undefined) {
      searchParams.set('active', params.active.toString());
    }
    
    const response = await api.get(`${ENDPOINT}?${searchParams.toString()}`);
    return GetBannerListResponse.parse(response);
  },

  retrieve: async (id: string) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return GetBannerResponse.parse(response);
  },

  create: async (body: AdminBannerCreateRequest) => {
    const response = await api.post(ENDPOINT, body);
    return response;
  },

  update: async (id: string, body: AdminBannerUpdateRequest) => {
    const response = await api.put(`${ENDPOINT}/${id}`, body);
    return response;
  },

  delete: async (id: string) => {
    const response = await api.delete(`${ENDPOINT}/${id}`);
    return response;
  },
};