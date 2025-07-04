import { mockNotificationEmptyListResponse, mockNotificationListResponse } from '@repo/api/user';
import { createMockHandlerGroup } from '../utils/mock';
import { BASE_URL } from '../config';

export const notificationHandlers = createMockHandlerGroup(BASE_URL + '/user/notifications', [
  {
    method: 'GET',
    path: '/',
    presets: [
      {
        label: '읽지 않은 알림 포함',
        status: 200,
        response: mockNotificationListResponse({
          page: 1,
          size: 20,
          sortType: 'RECENT',
          sortDirection: 'DESCENDING',
        }),
      },
      {
        label: '읽지 않은 알림 제외',
        status: 200,
        response: mockNotificationListResponse({
          page: 1,
          size: 20,
          sortType: 'RECENT',
          sortDirection: 'DESCENDING',
        }),
      },
      {
        label: '빈 리스트',
        status: 200,
        response: mockNotificationEmptyListResponse,
      },
    ],
  },
] as const);
