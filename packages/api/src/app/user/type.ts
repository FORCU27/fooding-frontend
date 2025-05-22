import { z } from 'zod';

import { ApiResponse } from '../../shared';

export const UserRole = z.enum(['USER', 'CEO', 'ADMIN']);
export type UserRole = z.infer<typeof UserRole>;

export const UserProvider = z.enum(['FOODING', 'GOOGLE', 'KAKAO', 'NAVER', 'APPLE']);
export type UserProvider = z.infer<typeof UserProvider>;

export const Gender = z.enum(['MALE', 'FEMALE', 'OTHER', 'NONE']);
export type Gender = z.infer<typeof Gender>;

export const User = z.object({
  id: z.number(),
  role: UserRole,
  email: z.string(),
  provider: UserProvider,
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
  gender: Gender,
});

export type User = z.infer<typeof User>;

export const GetUserResponse = ApiResponse(User);

export const AppStoreService = z.object({
  id: z.number(),
  storeId: z.number(),
  storeName: z.string(),
  type: z.string(),
  activation: z.boolean(),
});

export const GetAppStoreServiceResponse = ApiResponse(z.array(AppStoreService));
