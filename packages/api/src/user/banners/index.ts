export * from './type';

import { GetBannerByIdResponse, GetBannerListParams, GetBannerListResponse } from './type';
import { api } from '../../shared';

const ENDPOINT = '/user/banners';

export const bannerApi = {
  getBannerList: async (params: GetBannerListParams) => {
    const response = await api.get(ENDPOINT, { params });
    return GetBannerListResponse.parse(response);
  },
  getBannerById: async (id: string) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return GetBannerByIdResponse.parse(response);
  },
};
