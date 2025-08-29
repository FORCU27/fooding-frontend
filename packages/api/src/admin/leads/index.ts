export * from './type';

import { api } from '../../shared';
import { GetLeadListResponse } from './type';

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
    return GetLeadListResponse.parse(response);
  },
};

