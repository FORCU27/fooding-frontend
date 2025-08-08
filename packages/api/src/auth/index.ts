export * from './type';

import { api } from '../shared';
import {
  AuthLoginBody,
  AuthNotificationStatusBody,
  AuthSocialLoginBody,
  AuthRegisterBody,
  AuthUpdateUserBody,
  AuthUpdateUserProfileImageBody,
  GetLoginResponseSchema,
  GetUserNicknameCheckResponseSchema,
  GetUserResponseSchema,
  UpdateUserInfoResponseSchema,
} from './type';

export const authApi = {
  register: async (body: AuthRegisterBody) => {
    return await api.post('/auth/register', body);
  },

  login: async (body: AuthLoginBody) => {
    const response = await api.post('/auth/login', body);
    return GetLoginResponseSchema.parse(response);
  },

  socialLogin: async (body: AuthSocialLoginBody) => {
    const response = await api.post('/auth/social-login', body);
    return GetLoginResponseSchema.parse(response);
  },

  getSelf: async () => {
    const response = await api.get('/auth/me');
    return GetUserResponseSchema.parse(response);
  },

  updateInfo: async (body: AuthUpdateUserBody) => {
    const response = await api.patch('/auth/me', { ...body });
    return UpdateUserInfoResponseSchema.parse(response);
  },

  updateNotificationStatus: async (body: AuthNotificationStatusBody) => {
    const response = await api.patch('/auth/me', { ...body });
    return UpdateUserInfoResponseSchema.parse(response);
  },
  updateProfileImage: async (body: AuthUpdateUserProfileImageBody) => {
    const response = await api.patch('/auth/me/profile-image', { ...body });
    return UpdateUserInfoResponseSchema.parse(response);
  },
  nicknameCheck: async (nickname: string) => {
    const response = await api.get(`/auth/nickname/check?nickname=${nickname}`);
    return GetUserNicknameCheckResponseSchema.parse(response);
  },
};
