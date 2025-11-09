import { mockEmptyReviewListResponse, mockReviewListResponse } from '@repo/api/ceo';

import { mockClient } from '../utils/mock';

export const reviewHandlers = mockClient.createHandlerGroup('/ceo/review', [
  {
    method: 'GET',
    path: '',
    presets: [
      {
        label: '[성공] 기본 응답',
        status: 200,
        response: mockReviewListResponse({
          searchString: '',
          pageNum: 1,
          pageSize: 20,
          storeId: 23,
          ceoId: 19,
        }),
      },
      { label: '[성공] 빈 리스트', status: 200, response: mockEmptyReviewListResponse },
    ],
  },
] as const);
