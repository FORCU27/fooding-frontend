import { mockEmptyRecommendedKeywords, mockRecommendedKeywords } from '@repo/api/user';

import { mockClient } from '../utils/mock';

export const keywordHandlers = mockClient.createHandlerGroup('/user/recommend-keywords', [
  {
    method: 'GET',
    path: '/',
    presets: [
      {
        label: '[성공] 기본 응답',
        status: 200,
        response: mockRecommendedKeywords,
      },
      {
        label: '[성공] 빈 배열',
        status: 200,
        response: mockEmptyRecommendedKeywords,
      },
    ],
  },
] as const);
