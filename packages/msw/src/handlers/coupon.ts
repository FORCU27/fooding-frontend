import { mockMyCouponList } from '@repo/api/user';

import { mockClient } from '../utils/mock';

export const couponHandlers = mockClient.createHandlerGroup('/user/coupons', [
  {
    method: 'GET',
    path: '/',
    presets: [
      {
        label: '[성공] 쿠폰 목록',
        status: 200,
        response: mockMyCouponList,
      },
    ],
  },
]);
