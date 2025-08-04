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
  description: z.string().nullable(),
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

export type AuthRegisterBody = {
    email: string;
    nickname: string;
    password: string;
    role: UserRole;
    name: string;
    description?: string;
    phoneNumber: string;
    referralCode?: string;
    marketingConsent?: boolean;
};

export const AuthResponseSchema = z.object({
  accessToken: z.string(),
  expiredIn: z.number(),
  refreshToken: z.string(),
  refreshExpiredIn: z.number(),
});

export type AuthNotificationStatusBody = {
  marketingConsent: boolean;
  pushAgreed: boolean;
};

export type AuthUpdateUserBody = {
  nickname: string | null;
  phoneNumber: string | null;
  referralCode: string | null;
  description: string | null;
  gender: string;
};

export type AuthUpdateUserProfileImageBody = {
  imageId: string;
};

export const GetUserUpdateResponseSchema = z.object({
  status: z.string(),
  data: z.null(),
});

export type GetAuthResponse = z.infer<typeof AuthResponseSchema>;

export const GetLoginResponseSchema = ApiResponse(AuthResponseSchema);
export type GetLoginResponse = z.infer<typeof GetLoginResponseSchema>;

export const GetUserResponseSchema = ApiResponse(AuthLoginUserSchema);
export type GetUserResponse = z.infer<typeof GetUserResponseSchema>;

export const UpdateUserInfoResponseSchema = ApiResponse(z.null());
