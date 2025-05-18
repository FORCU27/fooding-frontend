export * from './type';

import { api } from '../shared';
import { GetLoginResponse } from '../user-login';
import {
  AuthLogin,
  AuthSocialLogin,
  GetLoginResponseSchema,
  GetUserResponse,
  GetUserResponseSchema,
} from './type';

export const authApi = {
  login: async (credentials: AuthLogin): Promise<GetLoginResponse> => {
    const response = await api.post('/auth/login', credentials);
    return GetLoginResponseSchema.parse(response);
  },

  socialLogin: async (credentials: AuthSocialLogin): Promise<GetLoginResponse> => {
    const response = await api.post('/auth/social-login', credentials);
    return GetLoginResponseSchema.parse(response);
  },

  getSelf: async (): Promise<GetUserResponse> => {
    const response = await api.get('/auth/me');
    return GetUserResponseSchema.parse(response);
  },
};
