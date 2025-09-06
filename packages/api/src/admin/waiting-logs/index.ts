export * from './type';

import { api } from '../../shared';
import { GetAdminWaitingLogListResponse, AdminWaitingLogResponseSchema } from './type';

const ENDPOINT = '/admin/waitings/logs';

export const adminWaitingLogApi = {
  getList: async (page: number = 0, size: number = 10) => {
    const params = new URLSearchParams({
      pageNum: (page + 1).toString(),
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

