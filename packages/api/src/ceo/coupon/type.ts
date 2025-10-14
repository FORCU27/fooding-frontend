import { z } from 'zod';

// Enum 타입들
export const BenefitType = z.enum(['DISCOUNT', 'GIFT']);
// 생성시와 수정시 다른 enum 값
export const CreateCouponType = z.enum(['GENERAL', 'FIRST_COME_FIRST_SERVED']);
export const UpdateCouponType = z.enum(['GENERAL', 'FIRST_COME_FIRST_SERVED']);
export const DiscountType = z.enum(['PERCENT', 'FIXED']);
// 생성시와 수정시 다른 enum 값
export const CreateProvideType = z.enum(['ALL', 'REGULAR_CUSTOMER']);
export const UpdateProvideType = z.enum(['ALL', 'REGULAR_CUSTOMER']);
export const CouponStatus = z.enum(['ACTIVE', 'INACTIVE', 'EXPIRED']);

// 쿠폰 생성 요청 바디
export const CreateCouponBody = z.object({
  storeId: z.number(),
  benefitType: BenefitType,
  type: CreateCouponType,
  discountType: DiscountType,
  provideType: CreateProvideType,
  name: z.string().min(0).max(50),
  conditions: z.string().min(0).max(200).optional(),
  totalQuantity: z.number().optional(),
  discountValue: z.number().optional(),
  giftItem: z.string().optional(),
  minOrderAmount: z.number().optional(),
  issueStartOn: z.string().optional(),
  issueEndOn: z.string().optional(),
  expiredOn: z.string().optional(),
  status: CouponStatus,
});

// 쿠폰 수정 요청 바디
export const UpdateCouponBody = z.object({
  storeId: z.number(),
  benefitType: BenefitType,
  type: UpdateCouponType,
  discountType: DiscountType,
  provideType: UpdateProvideType,
  name: z.string().min(0).max(50),
  conditions: z.string().min(0).max(200).optional(),
  totalQuantity: z.number().optional(),
  discountValue: z.number().optional(),
  giftItem: z.string().optional(),
  minOrderAmount: z.number().optional(),
  issueStartOn: z.string(), // 필수값
  issueEndOn: z.string().optional(),
  expiredOn: z.string().optional(),
  status: CouponStatus,
});

export type CreateCouponBody = z.infer<typeof CreateCouponBody>;
export type UpdateCouponBody = z.infer<typeof UpdateCouponBody>;



// 쿠폰 스키마 (조회용 - 모든 타입을 union으로 포함)
export const CouponSchema = z.object({
  id: z.number(),
  storeId: z.number(),
  benefitType: BenefitType,
  type: z.union([CreateCouponType, UpdateCouponType]),
  discountType: DiscountType.nullable(),
  provideType: UpdateProvideType,
  name: z.string(),
  conditions: z.string().nullable(),
  totalQuantity: z.number().nullable(),
  issuedQuantity: z.number(),
  discountValue: z.number().nullable(),
  giftItem: z.string().nullable(),
  minOrderAmount: z.number().nullable(),
  issueStartOn: z.string(),
  issueEndOn: z.string(),
  expiredOn: z.string(),
  status: CouponStatus,
  createdAt: z.string(),
  updatedAt: z.string(),
});

// 쿠폰 타입 정의
export type CouponSchema = z.infer<typeof CouponSchema>;
export type CreateCouponResponse = number; // 생성된 쿠폰 ID
export type UpdateCouponResponse = null; // 수정 응답
export type GetCouponResponse = {
  status: string;
  data: CouponSchema;
}; // 조회 응답

// 쿠폰 목록 조회 응답 타입
export type GetCouponListResponse = {
  status: string;
  data: {
    list: CouponSchema[];
    pageInfo: {
      pageNum: number;
      pageSize: number;
      totalCount: number;
      totalPages: number;
    };
  };
};

// 쿠폰 목록 조회 파라미터
export type GetCouponListParams = {
  storeId: number;
  pageNum?: number;
  pageSize?: number;
  searchString?: string;
  status?: 'ACTIVE' | 'INACTIVE';
};

// 쿠폰 사용내역 상태
export const CouponUsageStatus = z.enum(['AVAILABLE', 'USED', 'EXPIRED']);
export type CouponUsageStatus = z.infer<typeof CouponUsageStatus>;

// 쿠폰 사용내역 스키마
export const CouponUsageSchema = z.object({
  id: z.number(),
  userId: z.number(),
  profileImage: z.string().nullable(),
  nickname: z.string(),
  status: CouponUsageStatus,
  usedAt: z.string().nullable(),
  createdAt: z.string(),
});

export type CouponUsageSchema = z.infer<typeof CouponUsageSchema>;

// 쿠폰 사용내역 조회 파라미터
export type GetCouponUsageParams = {
  searchString?: string;
  pageNum?: number;
  pageSize?: number;
  sortType?: 'RECENT' | 'OLD';
};

// 쿠폰 사용내역 조회 응답
export type GetCouponUsageResponse = {
  status: string;
  data: {
    list: CouponUsageSchema[];
    pageInfo: {
      pageNum: number;
      pageSize: number;
      totalCount: number;
      totalPages: number;
    };
  };
};
