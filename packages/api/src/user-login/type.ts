import z from 'zod';

import { ApiResponse } from '../shared';

/**
 * 사용자 정보
 */
export const UserInfoType = z.object({
  id: z.number(),
  email: z.string(),
  nickname: z.string(),
  phoneNumber: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type UserInfoType = z.infer<typeof UserInfoType>;

/**
 * 일반 로그인 시 사용되는 로그인 폼 데이터
 */
export const UserLoginType = z.object({
  email: z.string().email('올바른 이메일을 입력해주세요.').min(1, '이메일을 입력해주세요.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});
export type UserLoginType = z.infer<typeof UserLoginType>;

/**
 * 소셜 로그인 시 전달되는 정보
 */
export const UserSocialLoginType = z.object({
  token: z.string().min(1, '인증 코드가 필요합니다.'),
  provider: z.enum(['GOOGLE', 'KAKAO', 'NAVER', 'APPLE']),
});
export type UserSocialLoginType = z.infer<typeof UserSocialLoginType>;

/**
 * 로그인 성공 시 반환되는 토큰 관련 데이터
 */
export const GetAuthResponseType = z.object({
  accessToken: z.string(),
  expiredIn: z.number(),
  refreshToken: z.string(),
  refreshExpiredIn: z.number(),
});
export type GetAuthResponseType = z.infer<typeof GetAuthResponseType>;

/**
 * 로그인 응답 형태
 * - 로그인 성공 시: { status: 'OK', data: GetAuthResponseType }
 */
export const GetLoginResponse = ApiResponse(GetAuthResponseType);
export type GetLoginResponse = z.infer<typeof GetLoginResponse>;

/**
 * 일반적인 API 응답 형태로 감싼 사용자 정보
 */
export const GetUserResponse = ApiResponse(UserInfoType);
export type GetUserResponse = z.infer<typeof GetUserResponse>;
