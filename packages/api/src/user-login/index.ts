export * from './type';

import { api } from '../shared';
import { GetLoginResponse, GetUserResponse, UserLoginType, UserSocialLoginType } from './type';

export const auth = {
  login: async (credentials: UserLoginType | UserSocialLoginType): Promise<GetLoginResponse> => {
    const response = await api.post<GetLoginResponse>('/user/auth/login', credentials);
    return response;
  },

  getSelf: async (): Promise<GetUserResponse> => {
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);

    const response = await api.get<GetUserResponse>('/user/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  },
};
