import { z } from 'zod/v4';

import { ApiResponse } from '../shared';

export const userRoles = ['USER', 'CEO', 'ADMIN'] as const;
export type UserRole = (typeof userRoles)[number];

export const socialPlatforms = ['KAKAO', 'NAVER', 'APPLE', 'GOOGLE'] as const;
export type SocialPlatform = (typeof socialPlatforms)[number];

export const AuthLoginUserSchema = z.object({
  id: z.number(),
  email: z.string(),
  nickname: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  referralCode: z.string().nullable(),
  profileImage: z.string().nullable(),
  loginCount: z.number(),
  gender: z.string(),
  termsAgreed: z.boolean(),
  privacyPolicyAgreed: z.boolean(),
  marketingConsent: z.boolean(),
  pushAgreed: z.boolean(),
  lastLoggedInAt: z.string().nullable(),
  createdAt: z.iso.datetime({ local: true }),
  updatedAt: z.string(),
});
export type AuthLoginUser = z.infer<typeof AuthLoginUserSchema>;

export type AuthSocialLoginBody = {
  code: string;
  provider: SocialPlatform;
  redirectUri: string;
  role: UserRole;
};

export type AuthLoginBody = {
  email: string;
  password: string;
  role: UserRole;
};

export const GetAuthResponseSchema = z.object({
  accessToken: z.string(),
  expiredIn: z.number(),
  refreshToken: z.string(),
  refreshExpiredIn: z.number(),
});

export type AuthUpdateUserBody = {
  nickname?: string;
  phoneNumber?: string;
  gender?: string;
  referralCode?: string;
  marketingConsent?: boolean;
  pushAgreed?: boolean;
};

export type GetAuthResponse = z.infer<typeof GetAuthResponseSchema>;

export const GetLoginResponseSchema = ApiResponse(GetAuthResponseSchema);
export type GetLoginResponse = z.infer<typeof GetLoginResponseSchema>;

export const GetUserResponseSchema = ApiResponse(AuthLoginUserSchema);
export type GetUserResponse = z.infer<typeof GetUserResponseSchema>;

export const UpdateUserInfoResponseSchema = ApiResponse(z.null());
