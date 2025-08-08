export * from './type';

import { api } from '../shared';
import {
  AuthLoginBody,
  AuthSocialLoginBody,
  AuthRegisterBody,
  AuthUpdateUserBody,
  GetLoginResponseSchema,
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
    const response = await api.put('/auth/me', { ...body });
    return UpdateUserInfoResponseSchema.parse(response);
  },
};
