import { GetAdminDeviceListResponse, RetrieveDeviceRequest } from './type';
import { api } from '../../shared';

export * from './type';

export const deviceApi = {
  getDeviceList: async (params: RetrieveDeviceRequest) => {
    const searchParams = new URLSearchParams();
    
    if (params.page !== undefined) {
      searchParams.append('page', params.page.toString());
    }
    if (params.size !== undefined) {
      searchParams.append('size', params.size.toString());
    }
    if (params.storeId !== undefined) {
      searchParams.append('storeId', params.storeId.toString());
    }
    if (params.searchString) {
      searchParams.append('searchString', params.searchString);
    }
    if (params.userId !== undefined) {
      searchParams.append('userId', params.userId.toString());
    }

    const response = await api.get(`/admin/devices?${searchParams.toString()}`);
    return GetAdminDeviceListResponse.parse(response);
  },

  deleteDevice: async (id: number): Promise<void> => {
    await api.delete(`/admin/devices/${id}`);
  },
};