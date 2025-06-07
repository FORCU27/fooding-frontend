export * from './type';

import { api } from '../shared';
import {
  AuthLoginBody,
  AuthSocialLoginBody,
  GetLoginResponseSchema,
  GetUserResponseSchema,
} from './type';

export const authApi = {
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
};
