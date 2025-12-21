import {
  CeoDeviceResponseSchema,
  GetCeoDeviceListResponse,
  GetDeviceLogsResponse,
  GetDeviceLogsParams,
  ChangeDeviceServiceParams,
  ChangeDeviceServiceResponse,
  DisconnectDeviceParams,
  DisconnectDeviceResponse,
} from './type';
import { api } from '../../shared';

export * from './type';

const ENDPOINT = '/ceo/devices';

export const deviceApi = {
  getCeoDeviceList: async (
    page: number = 1,
    size: number = 10,
    storeId: number,
    searchString?: string,
    sortType?: 'RECENT' | 'OLD',
  ) => {
    const params = new URLSearchParams({
      pageNum: page.toString(),
      pageSize: size.toString(),
    });

    if (storeId !== undefined) {
      params.append('storeId', storeId.toString());
    }

    if (searchString) {
      params.append('searchString', searchString);
    }

    if (sortType) {
      params.append('sortType', sortType);
    }

    const response = await api.get(`${ENDPOINT}?${params.toString()}`);
    return GetCeoDeviceListResponse.parse(response);
  },

  getDevice: async (deviceId: number) => {
    const response = await api.get(`${ENDPOINT}/${deviceId}`);
    return CeoDeviceResponseSchema.parse(response);
  },

  getDeviceLogs: async ({
    deviceId,
    pageNum = 1,
    pageSize = 10,
    searchString,
    serviceType,
    sortType,
  }: GetDeviceLogsParams) => {
    const params = new URLSearchParams({
      deviceId: deviceId.toString(),
      pageNum: pageNum.toString(),
      pageSize: pageSize.toString(),
    });

    if (searchString) {
      params.append('searchString', searchString);
    }

    if (serviceType) {
      params.append('serviceType', serviceType);
    }

    if (sortType) {
      params.append('sortType', sortType);
    }

    const response = await api.get(`${ENDPOINT}/logs?${params.toString()}`);
    return GetDeviceLogsResponse.parse(response);
  },

  changeDeviceService: async ({ deviceId, storeId, serviceType }: ChangeDeviceServiceParams) => {
    const params = new URLSearchParams({
      serviceType,
      storeId: storeId.toString(),
    });

    const response = await api.post(`${ENDPOINT}/${deviceId}/service?${params.toString()}`);
    return ChangeDeviceServiceResponse.parse(response);
  },

  disconnectDevice: async ({ deviceId }: DisconnectDeviceParams) => {
    const response = await api.post(`${ENDPOINT}/${deviceId}/user/disconnect`);
    return DisconnectDeviceResponse.parse(response);
  },
};
