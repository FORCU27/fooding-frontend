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
