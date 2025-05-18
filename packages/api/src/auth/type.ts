import z from 'zod';

import { ApiResponse } from '../shared';

/**
 * 로그인한 사용자 정보
 */
export const AuthLoginUserSchema = z.object({
  id: z.number(),
  email: z.string(),
  nickname: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  referralCode: z.string(),
  profileImage: z.string(),
  loginCount: z.number(),
  gender: z.string(),
  termsAgreed: z.boolean(),
  privacyPolicyAgreed: z.boolean(),
  marketingConsent: z.boolean(),
  lastLoggedInAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type AuthLoginUser = z.infer<typeof AuthLoginUserSchema>;

/**
 * 소셜 로그인 시 전달되는 정보
 */
export const AuthSocialLoginSchema = z.object({
  code: z.string().min(1, '인증 코드가 필요합니다.'),
  provider: z.enum(['GOOGLE', 'KAKAO', 'NAVER', 'APPLE']),
  redirectUri: z.string(),
  role: z.enum(['USER', 'CEO', 'ADMIN']),
});
export type AuthSocialLogin = z.infer<typeof AuthSocialLoginSchema>;

/**
 * 일반 로그인 시 전달되는 정보
 */
export const AuthLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
  role: z.enum(['USER', 'CEO', 'ADMIN']),
});
export type AuthLogin = z.infer<typeof AuthLoginSchema>;

/**
 * 로그인 성공 시 반환되는 토큰 관련 데이터
 */
export const GetAuthResponseSchema = z.object({
  accessToken: z.string(),
  expiredIn: z.number(),
  refreshToken: z.string(),
  refreshExpiredIn: z.number(),
});
export type GetAuthResponse = z.infer<typeof GetAuthResponseSchema>;

/**
 * 로그인 응답 형태
 * - 로그인 성공 시: { status: 'OK', data: GetAuthResponseType }
 */
export const GetLoginResponseSchema = ApiResponse(GetAuthResponseSchema);
export type GetLoginResponse = z.infer<typeof GetLoginResponseSchema>;
/**
 * 일반적인 API 응답 형태로 감싼 사용자 정보
 */
export const GetUserResponseSchema = ApiResponse(AuthLoginUserSchema);
export type GetUserResponse = z.infer<typeof GetUserResponseSchema>;
