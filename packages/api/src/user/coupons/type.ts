import { z } from 'zod/v4';

import { PageResponse } from '../../shared';

export const BEFENIT_TYPES = ['DISCOUNT', 'GIFT'] as const;
export type BenefitType = (typeof BEFENIT_TYPES)[number];

export const DISCOUNT_TYPES = ['PERCENT', 'FIXED'] as const;
export type DiscountType = (typeof DISCOUNT_TYPES)[number];

export const COUPON_STATUS = ['AVAILABLE', 'REQUESTED', 'USED'] as const;
export type CouponStatus = (typeof COUPON_STATUS)[number];

export type GetMyCouponListParams = {
  searchString: string;
  pageNum: number;
  pageSize: number;
  used: boolean;
  storeId?: number;
};

export type Coupon = z.infer<typeof Coupon>;
export const Coupon = z.object({
  id: z.number(),
  storeId: z.number(),
  storeName: z.string().nullable(),
  name: z.string(),
  conditions: z.string().nullable(),
  benefitType: z.enum(BEFENIT_TYPES),
  discountType: z.enum(DISCOUNT_TYPES),
  discountValue: z.number(),
  status: z.enum(COUPON_STATUS),
  usedAt: z.iso.datetime({ local: true }).nullable(),
  expiredOn: z.iso.date().nullable(),
  createdDateAt: z.iso.datetime({ local: true }),
});

export type GetMyCouponListResponse = z.infer<typeof GetMyCouponListResponse>;
export const GetMyCouponListResponse = PageResponse(Coupon);

export type ApplyCouponBody = {
  tableNumber: string;
};
