import {
  mockStoreByIdResponse,
  mockStoreImageListResponse,
  mockStoreListResponse,
  mockStoreMenuListResponse,
  mockStoreReviewListResponse,
} from '@repo/api/user';

import { mockClient } from '../utils/mock';

export const storeHandlers = mockClient.createHandlerGroup('/user/stores', [
  {
    method: 'GET',
    path: '/',
    presets: [
      {
        label: '[성공] 기본 응답',
        status: 200,
        response: mockStoreListResponse,
      },
    ],
  },
  {
    method: 'GET',
    path: '/immediate-entry',
    presets: [
      {
        label: '[성공] 기본 응답',
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
        label: '[성공] 기본 응답',
        status: 200,
        response: mockStoreByIdResponse,
      },
      {
        label: '[실패] 존재하지 않는 가게',
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
        label: '[성공] 기본 응답',
        status: 200,
        response: mockStoreMenuListResponse,
      },
      {
        label: '[실패] 존재하지 않는 가게의 메뉴',
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
        label: '[성공] 기본 응답',
        status: 200,
        response: mockStoreReviewListResponse,
      },
      {
        label: '[실패] 존재하지 않는 가게의 리뷰',
        status: 404,
        response: null,
      },
    ],
  },
  {
    method: 'GET',
    path: '/:id/images',
    presets: [
      {
        label: '[성공] 기본 응답',
        status: 200,
        response: mockStoreImageListResponse,
      },
    ],
  },
] as const);
