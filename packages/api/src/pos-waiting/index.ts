import { api } from '../shared';
import {
  WaitingListRequest,
  WaitingListResponse,
  CreateWaitingRequest,
  CreateWaitingResponse,
} from './types';
export type { WaitingListResponse };

const BASE_URL = '/pos/waitings';

export const posWaitingApi = {
  // 웨이팅 목록 조회
  getWaitingList: async (id: number, request: WaitingListRequest) => {
    // 추후 실제 API 연동
    // const response = await api.get(`${BASE_URL}/${id}/requests`, { params: request });
    // return WaitingListResponse.parse(response);

    // 목업 응답 구성
    const mockResponse = {
      status: 'OK',
      data: {
        list: [
          {
            id: 1,
            storeId: 1,
            user: {
              id: 1,
              storeId: 1,
              name: '홍길동',
              phoneNumber: '01012345678',
              count: 1,
            },
            callNumber: 1,
            channel: 'IN_PERSON',
            infantChairCount: 1,
            infantCount: 1,
            adultCount: 1,
            memo: 'this is memo.',
          },
        ],
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
          totalCount: 13,
          totalPages: 2,
        },
      },
    };
    return WaitingListResponse.parse(mockResponse);
  },
  // 웨이팅 상세 조회
  getWaitingById: async (requestId: string) => {
    return WaitingListResponse.parse(api.get(`${BASE_URL}/requests/${requestId}`));
  },
  // 웨이팅 등록
  createWaiting: async (id: number, request: CreateWaitingRequest) => {
    const response = await api.post(`${BASE_URL}/${id}/requests`, request);
    return CreateWaitingResponse.parse(response);
  },
  // 웨이팅 착석
  createWaitingSeat: async (requestId: string) => {
    const response = await api.post(`${BASE_URL}/requests/${requestId}/seat`);
    return response;
  },
  // 웨이팅 되돌리기
  createWaitingRevert: async (requestId: string) => {
    const response = await api.post(`${BASE_URL}/requests/${requestId}/revert`);
    return response;
  },
  // 웨이팅 취소
  createWaitingCancel: async (requestId: string) => {
    const response = await api.post(`${BASE_URL}/requests/${requestId}/cancel`);
    return response;
  },
  // 웨이팅 호출
  createWaitingCall: async (requestId: string) => {
    const response = await api.post(`${BASE_URL}/requests/${requestId}/call`);
    return response;
  },
};
