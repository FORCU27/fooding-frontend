export * from './type';

import { GetUserBannerListResponse, GetUserBannerResponse, UserBannerListParams } from './type';
import { api } from '../../shared';

const ENDPOINT = '/user/banners';

export const userBannerApi = {
  list: async (params?: UserBannerListParams) => {
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

    const queryString = searchParams.toString();
    const response = await api.get(`${ENDPOINT}${queryString ? `?${queryString}` : ''}`);
    return GetUserBannerListResponse.parse(response);
  },

  retrieve: async (id: string) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return GetUserBannerResponse.parse(response);
  },
};
