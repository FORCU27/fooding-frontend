export * from './type';

import { GetUserResponse } from './type';
import { api } from '../../shared';

export const userApi = {
  getUser: async () => {
    const response = await api.get(`/app/users`);
    try {
      return GetUserResponse.parse(response);
    } catch (error) {
      console.error('Zod parsing error:', error);
      throw error;
    }
  },
};
