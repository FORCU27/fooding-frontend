import { GetRegionListParams, GetRegionListResponse } from './type';
import { api } from '../../shared';

export * from './type';

const ENDPOINT = '/user/regions';

export const regionApi = {
  getRegionList: async (params: GetRegionListParams) => {
    const response = await api.get(ENDPOINT, { params });
    return GetRegionListResponse.parse(response);
  },
};
