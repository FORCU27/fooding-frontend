export * from './type';

import { GetAdminWaitingLogListResponse, AdminWaitingLogResponseSchema } from './type';
import { api } from '../../shared';

const ENDPOINT = '/admin/waitings/logs';

export const adminWaitingLogApi = {
  getList: async (page: number = 1, size: number = 10) => {
    const params = new URLSearchParams({
      pageNum: page.toString(),
      pageSize: size.toString(),
    });
    const response = await api.get(`${ENDPOINT}?${params.toString()}`);
    return GetAdminWaitingLogListResponse.parse(response);
  },
  getById: async (id: number) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return AdminWaitingLogResponseSchema.parse(response);
  },
  delete: async (id: number) => api.delete(`${ENDPOINT}/${id}`),
};
