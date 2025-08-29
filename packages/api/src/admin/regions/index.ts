export * from './type';

import {
  GetRegionListResponse,
  GetRegionResponse,
  AdminRegionCreateRequest,
  AdminRegionUpdateRequest,
} from './type';
import { api } from '../../shared';

const ENDPOINT = '/admin/regions';

export const regionApi = {
  getRegionList: async (
    page: number = 0,
    size: number = 10,
    filters?: { searchString?: string; parentRegionId?: string },
  ) => {
    const params = new URLSearchParams({
      pageNum: (page + 1).toString(),
      pageSize: size.toString(),
    });
    if (filters?.searchString) params.set('searchString', filters.searchString);
    if (filters?.parentRegionId) params.set('parentRegionId', filters.parentRegionId);
    const response = await api.get(`${ENDPOINT}?${params.toString()}`);
    return GetRegionListResponse.parse(response);
  },

  getRegion: async (id: string) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return GetRegionResponse.parse(response);
  },

  createRegion: async (body: AdminRegionCreateRequest) => {
    return api.post(ENDPOINT, body);
  },

  updateRegion: async (id: string, body: AdminRegionUpdateRequest) => {
    return api.put(`${ENDPOINT}/${id}`, body);
  },

  deleteRegion: async (id: string) => {
    return api.delete(`${ENDPOINT}/${id}`);
  },

  batchCreate: async (data: AdminRegionCreateRequest[]) => {
    return api.post(`${ENDPOINT}/batch`, { data });
  },
};
