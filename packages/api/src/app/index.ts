export * from './type';

import { api } from '../shared';
import { GetUserResponse, GetAppStoreServiceResponse } from './type';
import { ENDPOINT } from '../example';

export const appApi = {
  getUser: async () => {
    return GetUserResponse.parse(api.get(`${ENDPOINT}/app/users`));
  },

  getAppStoreServiceList: async (id: number) => {
    return GetAppStoreServiceResponse.parse(api.get(`${ENDPOINT}/app/store-service/${id}`));
  },
};
