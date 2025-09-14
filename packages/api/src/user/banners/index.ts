import { GetBannerListResponse } from './type';
import { api } from '../../shared';

const ENDPOINT = '/user/banners';

export const bannerApi = {
  getBannerList: async () => {
    const response = await api.get(ENDPOINT);
    return GetBannerListResponse.parse(response);
  },
};
