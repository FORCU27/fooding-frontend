import { api } from '../shared';
import { PageResponseSchema } from './type';

export const ceoDeviceApi = {
  getCeoDeviceList: async (
    page: number = 0,
    size: number = 10,
    storeId: number,
    searchString?: string,
  ) => {
    const params = new URLSearchParams({
      pageNum: (page + 1).toString(),
      pageSize: size.toString(),
    });

    if (storeId !== undefined) {
      params.append('storeId', storeId.toString());
    }

    if (searchString) {
      params.append('searchString', searchString);
    }

    const response = await api.get(`/ceo/devices?${params.toString()}`);
    return PageResponseSchema.parse(response);
  },
};
