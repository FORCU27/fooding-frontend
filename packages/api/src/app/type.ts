import { z } from 'zod';

import { ApiResponse } from '../shared';

export type User = z.infer<typeof User>;
export const User = z.object({
  id: z.number(),
  role: z.string(), // 'USER' | 'CEO' | 'ADMIN'
  email: z.string(),
  provider: z.string(), // FOODING, GOOGLE, KAKAO, NAVER, APPLE
  nickname: z.string(),
  phoneNumber: z.string(),
  referralCode: z.string(),
  profileImage: z.string(),
  loginCount: z.number(),
  lastLoggedInAt: z.string(),
  termsAgreed: z.boolean(),
  termsAgreedAt: z.string(),
  privacyPolicyAgreed: z.boolean(),
  privacyPolicyAgreedAt: z.string(),
  marketingConsent: z.boolean(),
  marketingConsentAt: z.string(),
  gender: z.string(), // MALE, FEMALE, OTHER, NONE
});

export const GetUserResponse = ApiResponse(User);

/** 개별 Store */
export const Store = z.object({
  id: z.number(),
  name: z.string(),
  city: z.string(),
  address: z.string(),
  category: z.string(),
  description: z.string(),
  priceCategory: z.string(),
  eventDescription: z.string(),
  contactNumber: z.string(),
  direction: z.string(),
  information: z.string(),
  isParkingAvailable: z.boolean(),
  isNewOpen: z.boolean(),
  isTakeOut: z.boolean(),
});

export type Store = z.infer<typeof Store>;

/** 페이지 정보 */
export const PageInfo = z.object({
  pageNum: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
  totalPages: z.number(),
});

/** 최종 응답 스키마 */
export const GetStoresResponse = z.object({
  list: z.array(Store),
  pageInfo: PageInfo,
});

export type GetStoresResponse = z.infer<typeof GetStoresResponse>;
