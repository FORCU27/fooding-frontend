export * from './type';

import { GetUserResponse } from './type';
import { ENDPOINT } from '../../example';
import { api } from '../../shared';

export const userApi = {
  getUser: async () => {
    return GetUserResponse.parse(api.get(`${ENDPOINT}/app/users`));
  },
};
