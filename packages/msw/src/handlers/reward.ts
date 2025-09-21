import { mockRewardPersonalLogsResponse } from '@repo/api/user';

import { mockClient } from '../utils/mock';

export const rewardHandlers = mockClient.createHandlerGroup('/user/reward', [
  {
    method: 'GET',
    path: '/logs/personal',
    presets: [
      {
        label: '[성공] 빈 목록',
        status: 200,
        response: mockRewardPersonalLogsResponse,
      },
    ],
  },
]);
