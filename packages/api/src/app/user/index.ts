export * from './type';

import { GetUserResponse } from './type';
import { api } from '../../shared';

export const userApi = {
  getUser: async () => {
    return GetUserResponse.parse(api.get(`/app/users`));
  },
};
