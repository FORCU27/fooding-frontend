export * from './type';

import { GetUserResponse } from './type';
import { api } from '../../shared';

export const userApi = {
  getUser: async () => {
    const response = await api.get(`/app/users`);
    return GetUserResponse.parse(response);
  },
};
