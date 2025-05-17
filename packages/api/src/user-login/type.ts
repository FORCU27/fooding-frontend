import z from 'zod';

import { ApiResponse } from '../shared';

/**
 * 사용자 정보
 */
export const UserInfoSchema = z.object({
  id: z.number(),
  email: z.string(),
  nickname: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type UserInfoType = z.infer<typeof UserInfoSchema>;

/**
 * 소셜 로그인 시 전달되는 정보
 */
export const UserSocialLoginSchema = z.object({
  token: z.string().min(1, '인증 코드가 필요합니다.'),
  provider: z.enum(['GOOGLE', 'KAKAO', 'NAVER', 'APPLE']),
});
export type UserSocialLogin = z.infer<typeof UserSocialLoginSchema>;

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
export const GetUserResponseSchema = ApiResponse(UserInfoSchema);
export type GetUserResponse = z.infer<typeof GetUserResponseSchema>;
