export * from './type';

import { api } from '../shared';
import { GetUserResponse } from './type';
import { ENDPOINT } from '../example';

export const appApi = {
  getUser: async () => {
    return GetUserResponse.parse(api.get(`${ENDPOINT}/app/users`));
  },
};
