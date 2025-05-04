import { api } from '../shared';
import { WaitingListRequest, WaitingListResponse, WaitingCreateRequest, WaitingCreateResponse } from './type';

const BASE_URL = '/app/waitings';

export const appWaitingApi = {
  // 웨이팅 목록 조회
  getWaitingList: async (id: number, request: WaitingListRequest) => {
    const response = await api.get(`${BASE_URL}/${id}/requests`, { params: request });
    return WaitingListResponse.parse(response);
  },

  // 웨이팅 등록
  createWaiting: async (id: number, request: WaitingCreateRequest) => {
    return WaitingCreateResponse.parse(api.post(`${BASE_URL}/${id}/requests`, request));
  },
};
