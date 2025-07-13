import { mockStorePostByIdResponse, mockStorePostListResponse } from '@repo/api/user';

import { mockClient } from '../utils/mock';

export const storePostHandlers = mockClient.createHandlerGroup('/user/store-posts', [
  {
    method: 'GET',
    path: '/',
    presets: [
      {
        label: '[성공] 가게 소식 목록',
        status: 200,
        response: mockStorePostListResponse,
      },
    ],
  },
  {
    method: 'GET',
    path: '/:id',
    presets: [
      {
        label: '[성공] 가게 소식 상세',
        status: 200,
        response: mockStorePostByIdResponse,
      },
    ],
  },
]);
