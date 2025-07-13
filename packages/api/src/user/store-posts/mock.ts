import { GetStorePostByIdResponse, GetStorePostListResponse } from './type';

export const mockStorePostListResponse: GetStorePostListResponse = {
  status: 'OK',
  data: [
    {
      id: 1,
      title: '가성비맛집 바다풍경 정육식당 사전 예약 필수입니다',
      content:
        '가성비맛집 바다풍경 정육식당 사전 예약 필수입니다. 이곳은 정말 맛있고 가격도 저렴해서 자주 가는 곳이에요. 특히 고기가 신선하고 양도 푸짐해서 만족도가 높습니다. 추천합니다!',
      tags: ['대표', '공지'],
      images: [
        {
          id: 1,
          imageUrl:
            'https://img.freepik.com/free-photo/tasty-food-arrangement-top-view_23-2149182261.jpg',
        },
        {
          id: 2,
          imageUrl:
            'https://img.freepik.com/free-photo/tasty-food-arrangement-top-view_23-2149182261.jpg',
        },
      ],
      createdAt: '2025-06-23T10:00:00',
      fixed: true,
    },
    {
      id: 2,
      title: '신메뉴 출시! 해물파전과 막걸리의 환상 조합',
      content:
        '신메뉴 출시! 해물파전과 막걸리의 환상 조합을 즐겨보세요. 이 조합은 정말 맛있고, 친구들과 함께하기에 딱 좋은 메뉴입니다.',
      tags: ['대표', '공지'],
      images: [
        {
          id: 1,
          imageUrl:
            'https://img.freepik.com/free-photo/tasty-food-arrangement-top-view_23-2149182261.jpg',
        },
      ],
      createdAt: '2025-06-24T11:00:00',
      fixed: false,
    },
    {
      id: 3,
      title: '여름 한정! 시원한 냉면과 함께하는 더위 탈출',
      content:
        '여름 한정으로 시원한 냉면을 제공합니다. 더위를 날려버릴 수 있는 최고의 메뉴입니다. 꼭 드셔보세요!',
      tags: ['대표', '공지'],
      images: [],
      createdAt: '2025-06-25T12:00:00',
      fixed: false,
    },
  ],
};

export const mockStorePostByIdResponse: GetStorePostByIdResponse = {
  status: 'OK',
  data: {
    id: 1,
    title: '가성비맛집 바다풍경 정육식당 사전 예약 필수입니다',
    content:
      '가성비맛집 바다풍경 정육식당 사전 예약 필수입니다. 이곳은 정말 맛있고 가격도 저렴해서 자주 가는 곳이에요. 특히 고기가 신선하고 양도 푸짐해서 만족도가 높습니다. 추천합니다!',
    tags: ['대표', '공지'],
    images: [
      {
        id: 1,
        imageUrl:
          'https://img.freepik.com/free-photo/tasty-food-arrangement-top-view_23-2149182261.jpg',
      },
      {
        id: 2,
        imageUrl:
          'https://img.freepik.com/free-photo/tasty-food-arrangement-top-view_23-2149182261.jpg',
      },
    ],
    createdAt: '2025-06-23T10:00:00',
    fixed: true,
  },
};
