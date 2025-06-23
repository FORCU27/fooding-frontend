import { GetStorePostByIdResponse } from './type';

export const mockStorePostByIdResponse: GetStorePostByIdResponse = {
  status: 'OK',
  data: {
    id: 1,
    title: '가성비맛집 바다풍경 정육식당 사전 예약 필수입니다',
    content:
      '가성비맛집 바다풍경 정육식당 사전 예약 필수입니다. 이곳은 정말 맛있고 가격도 저렴해서 자주 가는 곳이에요. 특히 고기가 신선하고 양도 푸짐해서 만족도가 높습니다. 추천합니다!',
    tags: ['대표', '공지'],
    createdAt: '2025-06-23T10:00:00',
    fixed: true,
  },
};
