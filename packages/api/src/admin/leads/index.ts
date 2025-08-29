export * from './type';

import { GetLeadListResponse, UploadLeadRequest, UploadLeadResponseSchema, AdminLeadResponse, AdminLeadResponseSchema } from './type';
import { api } from '../../shared';

const ENDPOINT = '/admin/leads';

export const leadApi = {
  getLeadList: async (page: number = 0, size: number = 10, searchString?: string) => {
    const params = new URLSearchParams({
      pageNum: (page + 1).toString(),
      pageSize: size.toString(),
    });

    if (searchString && searchString.length > 0) {
      params.set('searchString', searchString);
    }

    const response = await api.get(`${ENDPOINT}?${params.toString()}`);
    // 백엔드 응답 구조: { status: string, data: PageResponse<AdminLeadResponse> }
    return GetLeadListResponse.parse(response);
  },

  getLead: async (id: string): Promise<AdminLeadResponse> => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    // 백엔드 응답 구조: { status: string, data: AdminLeadResponse }
    const parsedResponse = AdminLeadResponseSchema.parse((response as any).data);
    return parsedResponse;
  },

  uploadLead: async (id: string, data: UploadLeadRequest) => {
    const response = await api.post(`${ENDPOINT}/${id}/upload`, data);
    return UploadLeadResponseSchema.parse(response);
  },
};

