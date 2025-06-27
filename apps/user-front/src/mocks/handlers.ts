import {
  mockNotificationListResponse,
  mockStoreByIdResponse,
  mockStoreMenuListResponse,
  mockStoreReviewListResponse,
} from '@repo/api/user';
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
  http.get<{ id: string }>('/user/stores/:id', () => {
    return HttpResponse.json(mockStoreByIdResponse);
  }),
  http.get<{ id: string }>('/user/stores/:id/menus', () => {
    return HttpResponse.json(mockStoreMenuListResponse);
  }),
  http.get<{ id: string }>('/user/stores/:id/reviews', () => {
    return HttpResponse.json(mockStoreReviewListResponse);
  }),
];
