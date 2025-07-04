import { mockNotificationEmptyListResponse, mockNotificationListResponse } from '@repo/api/user';

import { mockClient } from '../utils/mock';

export const notificationHandlers = mockClient.createHandlerGroup('/user/notifications', [
  {
    method: 'GET',
    path: '/',
    presets: [
      {
        label: '[성공] 기본 응답',
        status: 200,
        response: mockNotificationListResponse({
          page: 1,
          size: 20,
          sortType: 'RECENT',
          sortDirection: 'DESCENDING',
        }),
      },
      {
        label: '[성공] 빈 리스트',
        status: 200,
        response: mockNotificationEmptyListResponse,
      },
    ],
  },
] as const);
