import { api } from '../shared';
import { WaitingListRequest, WaitingListResponse } from './types';
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
    return WaitingListResponse.parse(mockResponse); // Zod 파싱으로 타입 보장
  },
  // 웨이팅 상세 조회
  getWaitingById: async (requestId: string) => {
    return WaitingListResponse.parse(api.get(`${BASE_URL}/requests/${requestId}`));
  },
};

//   getExampleById: async (requestId: string) => {
//     // 필요 시 이 부분도 목업으로 대체 가능
//     const mockItem = {
//       status: 'OK',
//       data: {
//         list: [],
//         pageInfo: {
//           pageNum: 1,
//           pageSize: 10,
//           totalCount: 0,
//           totalPages: 0,
//         },
//       },
//     };
//     return WaitingListResponse.parse(mockItem);
//   },
// };
