export * from './type';
import {
  GetCancelWaitingResponse,
  GetCreateWaitingReseponse,
  GetWaitingDetailResponse,
  StoreWaitingBody,
} from './type';
import { api } from '../../shared';

const ENDPOINT = '/user/store-waitings';

export const storeWaitingApi = {
  getWaitingById: async (id: number) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return GetWaitingDetailResponse.parse(response);
  },
  createWaiting: async (body: StoreWaitingBody) => {
    const response = await api.post(ENDPOINT, body);
    return GetCreateWaitingReseponse.parse(response);
  },
  cancelWaiting: async (id: number) => {
    const response = await api.post(`${ENDPOINT}/${id}/cancel`);
    return GetCancelWaitingResponse.parse(response);
  },
};
