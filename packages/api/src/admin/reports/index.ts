export * from './type';

import {
  AdminCreateReportRequest,
  AdminUpdateReportRequest,
  GetReportListParams,
  GetReportListResponse,
  GetReportResponse,
} from './type';
import { api } from '../../shared';

const ENDPOINT = '/admin/report';

export const reportApi = {
  list: async (params: GetReportListParams) => {
    const query = new URLSearchParams();
    if (params.pageNum !== undefined) query.set('pageNum', String(params.pageNum));
    if (params.pageSize !== undefined) query.set('pageSize', String(params.pageSize));
    if (params.referenceId !== undefined) query.set('referenceId', String(params.referenceId));
    if (params.targetType) query.set('targetType', params.targetType);
    if (params.reporterId !== undefined) query.set('reporterId', String(params.reporterId));
    if (params.status) query.set('status', params.status);
    if (params.chargerId !== undefined) query.set('chargerId', String(params.chargerId));
    if (params.searchString) query.set('searchString', params.searchString);

    const response = await api.get(`${ENDPOINT}?${query.toString()}`);
    return GetReportListResponse.parse(response);
  },

  retrieve: async (id: number) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return GetReportResponse.parse(response);
  },

  create: async (body: AdminCreateReportRequest) => {
    const response = await api.postForm(ENDPOINT, body);
    return response;
  },

  update: async (id: number, body: AdminUpdateReportRequest) => {
    const response = await api.patch(`${ENDPOINT}/${id}`, body);
    return response;
  },

  delete: async ({ id, deletedBy }: { id: number; deletedBy: number }) => {
    const response = await api.delete(`${ENDPOINT}/${id}`, { params: { deletedBy } });
    return response;
  },

  approve: async (id: number, chargerId: number) => {
    const response = await api.post(`${ENDPOINT}/${id}/approve`, undefined, {
      params: { chargerId },
    });
    return response;
  },

  reject: async (id: number, chargerId: number) => {
    const response = await api.post(`${ENDPOINT}/${id}/reject`, undefined, {
      params: { chargerId },
    });
    return response;
  },

  success: async (id: number, chargerId: number) => {
    const response = await api.post(`${ENDPOINT}/${id}/success`, undefined, {
      params: { chargerId },
    });
    return response;
  },
};

