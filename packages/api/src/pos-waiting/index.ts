import { api } from '../shared';
import { WaitingListRequest, WaitingListResponse } from './types';

const BASE_URL = '/pos/waitings';

export const posWaitingApi = {
  // 웨이팅 목록 조회
  getWaitingList: async (id: number, request: WaitingListRequest) => {
    const response = await api.get(`${BASE_URL}/${id}/requests`, { params: request });
    return WaitingListResponse.parse(response);
  },
  // 웨이팅 상세 조회
  getExampleById: async (requestId: string) => {
    return WaitingListResponse.parse(api.get(`${BASE_URL}/requests/${requestId}`));
  },
};
