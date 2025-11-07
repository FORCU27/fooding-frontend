import { GetUsersParams, GetUsersResponse } from './type';
import { api } from '../../shared';

export * from './type';

const ENDPOINT = '/ceo/users';

export const usersApi = {
  getUsers: async ({ searchString, pageNum = 1, pageSize = 10 }: GetUsersParams) => {
    const params = new URLSearchParams({
      searchString,
      pageNum: pageNum.toString(),
      pageSize: pageSize.toString(),
    });

    const response = await api.get(`${ENDPOINT}?${params.toString()}`);
    return GetUsersResponse.parse(response);
  },
};
