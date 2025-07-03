import {
  mockStoreByIdResponse,
  mockStoreListResponse,
  mockStoreMenuListResponse,
  mockStoreReviewListResponse,
} from '@repo/api/user';
import { createMockHandlerGroup } from '../utils/mock';

export const storeHandlers = createMockHandlerGroup('/user/stores', [
  {
    method: 'GET',
    path: '/',
    presets: [
      {
        label: '성공',
        status: 200,
        response: mockStoreListResponse,
      },
    ],
  },
  {
    method: 'GET',
    path: '/:id',
    presets: [
      {
        label: '기본 응답',
        status: 200,
        response: mockStoreByIdResponse,
      },
      {
        label: '존재하지 않는 가게',
        status: 404,
        response: null,
      },
    ],
  },
  {
    method: 'GET',
    path: '/:id/menus',
    presets: [
      {
        label: '기본 응답',
        status: 200,
        response: mockStoreMenuListResponse,
      },
      {
        label: '존재하지 않는 가게의 메뉴',
        status: 404,
        response: null,
      },
    ],
  },
  {
    method: 'GET',
    path: '/:id/reviews',
    presets: [
      {
        label: '기본 응답',
        status: 200,
        response: mockStoreReviewListResponse,
      },
      {
        label: '존재하지 않는 가게의 리뷰',
        status: 404,
        response: null,
      },
    ],
  },
] as const);
