import { GetUserRewardLogResponse } from './type';

export const mockRewardPersonalLogsResponse: GetUserRewardLogResponse = {
  status: 'OK',
  data: {
    list: [],
    pageInfo: {
      pageNum: 1,
      pageSize: 10,
      totalPages: 1,
      totalCount: 0,
    },
  },
};
