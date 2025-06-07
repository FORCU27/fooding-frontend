import { mockNotificationListResponse } from '@repo/api/user';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/user/notifications', () => {
    return HttpResponse.json(
      mockNotificationListResponse({
        page: 1,
        size: 20,
        sortType: 'RECENT',
        sortDirection: 'DESCENDING',
      }),
    );
  }),
];
