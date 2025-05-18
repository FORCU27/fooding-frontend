export * from './type';

import { api } from '../shared';
import {
  GetLoginResponse,
  GetLoginResponseSchema,
  GetUserResponse,
  GetUserResponseSchema,
  UserSocialLogin,
} from './type';

export const auth = {
  login: async (
    credentials: { email: string; password: string } | UserSocialLogin,
  ): Promise<GetLoginResponse> => {
    const response = await api.post<GetLoginResponse>('/user/auth/login', credentials);
    return GetLoginResponseSchema.parse(response);
  },

  getSelf: async (): Promise<GetUserResponse> => {
    const response = await api.get<GetUserResponse>('/user/users/me');
    return GetUserResponseSchema.parse(response);
  },
};
