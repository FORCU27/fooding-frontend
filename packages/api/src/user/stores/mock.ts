import {
  GetStoreByIdResponse,
  GetStoreListResponse,
  GetStoreMenuListResponse,
  GetStoreReviewListResponse,
} from './type';

const MENU_IMAGE_URL =
  'https://img.freepik.com/free-photo/top-view-table-full-food_23-2149209253.jpg';

const MENU_IMAGE_URLS = [
  'https://img.freepik.com/free-photo/tasty-food-arrangement-top-view_23-2149182261.jpg',
  'https://img.freepik.com/free-photo/top-view-table-full-food_23-2149209253.jpg',
  'https://img.freepik.com/free-photo/chicken-steak-with-lemon-tomato-chili-carrot-white-plate_1150-25887.jpg',
];

export const mockStoreListResponse: GetStoreListResponse = {
  status: 'OK',
  data: {
    pageInfo: {
      pageNum: 1,
      pageSize: 10,
      totalPages: 1,
      totalCount: 3,
    },
    list: [
      {
        id: 1,
        name: '바다풍경 정육식당 흑돼지 용담탑동본점',
        mainImage: null,
        averageRating: 4.9,
        city: '합정',
        estimatedWaitingTimeMinutes: 20,
        visitCount: 1000,
        reviewCount: 231,
        isBookmarked: false,
        isFinished: false,
      },
      {
        id: 2,
        name: '엉터리 생고기 엉생 무한리필 아산테크노본점',
        mainImage: null,
        averageRating: 4.9,
        city: '합정',
        estimatedWaitingTimeMinutes: 20,
        visitCount: 1000,
        reviewCount: 231,
        isBookmarked: false,
        isFinished: false,
      },
      {
        id: 3,
        name: '민서네 김밥 홍대점',
        mainImage: null,
        averageRating: 4.9,
        city: '합정',
        estimatedWaitingTimeMinutes: 20,
        visitCount: 1000,
        reviewCount: 231,
        isBookmarked: false,
        isFinished: false,
      },
      {
        id: 4,
        name: '민서네 김밥 홍대점',
        mainImage: null,
        averageRating: 4.9,
        city: '합정',
        estimatedWaitingTimeMinutes: 20,
        visitCount: 1000,
        reviewCount: 231,
        isBookmarked: false,
        isFinished: false,
      },
      {
        id: 5,
        name: '민서네 김밥 홍대점',
        mainImage: null,
        averageRating: 4.9,
        city: '합정',
        estimatedWaitingTimeMinutes: 20,
        visitCount: 1000,
        reviewCount: 231,
        isBookmarked: false,
        isFinished: false,
      },
    ],
  },
};

export const mockStoreByIdResponse: GetStoreByIdResponse = {
  status: 'OK',
  data: {
    id: 1,
    name: '홍길동 식당',
    city: '합정',
    address: '서울특별시 마포구',
    category: '한식',
    description: '설명설명',
    priceCategory: '15000 ~ 30000',
    eventDescription: '이벤트없음',
    contactNumber: '010-0000-0000',
    direction: '홍대입구역 2번출구 앞',
    visitCount: 1000,
    reviewCount: 246,
    averageRating: 4.5,
    isParkingAvailable: true,
    isNewOpen: true,
    isTakeOut: true,
    estimatedWaitingTimeMinutes: 20,
    latitude: 37.5665,
    longitude: 126.978,
    bookmarkCount: 2,
    images: [
      {
        id: 1,
        imageUrl: MENU_IMAGE_URL,
        sortOrder: 1,
        tags: ['태그1', '태그2'],
      },
      {
        id: 2,
        imageUrl: MENU_IMAGE_URL,
        sortOrder: 2,
        tags: ['태그1'],
      },
      {
        id: 3,
        imageUrl: MENU_IMAGE_URL,
        sortOrder: 3,
        tags: ['태그3'],
      },
    ],
    isBookmarked: false,
    isFinished: false,
  },
};

export const mockStoreReviewListResponse: GetStoreReviewListResponse = {
  status: 'OK',
  data: {
    list: [
      {
        reviewId: 1,
        content:
          '잘먹었습니다. 감사합니다. 단골인데 항상 챙겨주시고 사장님도 너무 친절해요~^^ 어쩌구 저쩌구 너무 맛잇고 맛좋코 또 오고싶고 어쩌ㅇ구쩌구 어쩌ㅇ구쩌구어쩌ㅇ구쩌구',
        profileUrl: 'https://img.freepik.com/free-vector/woman-with-long-black-hair_90220-2937.jpg',
        imageUrls: [MENU_IMAGE_URL],
        likeCount: 10,
        nickname: '민수엄마',
        purpose: 'BUSINESS',
        score: {
          mood: 4.5,
          service: 4.0,
          taste: 5.0,
          total: 4.5,
        },
        createdAt: '2025-06-20T03:44:25.499Z',
        updatedAt: '2025-06-20T03:44:25.499Z',
      },
      {
        reviewId: 2,
        content: '잘먹었습니다. 감사합니다.',
        profileUrl: 'https://img.freepik.com/free-vector/flat-style-woman-avatar_90220-2876.jpg',
        imageUrls: MENU_IMAGE_URLS,
        likeCount: 10,
        nickname: '민수',
        purpose: 'BUSINESS',
        score: {
          mood: 3.5,
          service: 4.0,
          taste: 5.0,
          total: 3.5,
        },
        createdAt: '2025-06-20T03:44:25.499Z',
        updatedAt: '2025-06-20T03:44:25.499Z',
      },
      {
        reviewId: 3,
        content: '잘먹었습니다.',
        profileUrl: 'https://img.freepik.com/free-vector/woman-with-long-black-hair_90220-2937.jpg',
        imageUrls: [],
        likeCount: 1,
        nickname: '리뷰~',
        purpose: 'BUSINESS',
        score: {
          mood: 4.5,
          service: 4.0,
          taste: 5.0,
          total: 2.5,
        },
        createdAt: '2025-06-20T03:44:25.499Z',
        updatedAt: '2025-06-20T03:44:25.499Z',
      },
    ],
    pageInfo: {
      pageNum: 1,
      pageSize: 10,
      totalPages: 1,
      totalCount: 3,
    },
  },
};

export const mockStoreMenuListResponse: GetStoreMenuListResponse = {
  status: 'OK',
  data: [
    {
      id: 1,
      categoryName: '식사류',
      menu: [
        {
          id: 1,
          name: '김치찌개',
          description: '매운 김치찌개',
          imageUrl: MENU_IMAGE_URL,
          price: 10000,
          sortOrder: 1,
          signature: true,
          recommend: false,
        },
      ],
    },
  ],
};
