import { GetMyCouponListResponse } from './type';

export const mockMyCouponList: GetMyCouponListResponse = {
  status: 'OK',
  data: {
    list: [
      {
        id: 1,
        benefitType: 'DISCOUNT',
        discountType: 'FIXED',
        discountValue: 3000,
        storeId: 1,
        storeName: '밥밥',
        usedAt: null,
        name: '계란김밥 증정 쿠폰',
        expiredOn: '2025-12-31',
        createdDateAt: '2025-06-07T06:43:14.677312',
        conditions: null,
        status: 'AVAILABLE',
        images: null,
        point: 1000,
        tableNumber: null,
      },
    ],
    pageInfo: {
      pageNum: 1,
      pageSize: 10,
      totalCount: 1,
      totalPages: 1,
    },
  },
};
