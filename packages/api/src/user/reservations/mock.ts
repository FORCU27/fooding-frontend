import {
  GetReservationCompletedListResponse,
  GetReservationListResponse,
  GetWaitingDetailResponse,
} from './type';

export const mockReservationListResponse: GetReservationListResponse = {
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
        storeId: 1,
        name: '바다풍경 정육식당 흑돼지 용담탑동본점 바다풍경',
        isWaiting: true,
        waitingType: 'IN_PERSON',
        waitingNumber: 2,
        adultCount: 3,
        mainImgUrl:
          'https://img.freepik.com/free-photo/tasty-food-arrangement-top-view_23-2149182261.jpg',
        createdAt: '2025-06-20T03:44:25.499Z',
      },
      {
        id: 2,
        storeId: 2,
        name: '바다풍경',
        isWaiting: true,
        waitingType: 'ONLINE',
        waitingNumber: 20,
        adultCount: 5,
        createdAt: '2025-06-20T03:44:25.499Z',
      },
      {
        id: 3,
        storeId: 3,
        name: '정육식당 흑돼지',
        isWaiting: false,
        adultCount: 2,
        mainImgUrl:
          'https://img.freepik.com/free-photo/tasty-food-arrangement-top-view_23-2149182261.jpg',
        createdAt: '2025-06-20T03:44:25.499Z',
      },
    ],
  },
};

export const mockReservationCompletedListResponse: GetReservationCompletedListResponse = {
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
        storeId: 1,
        name: '바다풍경 정육식당 흑돼지 용담탑동본점 바다풍경',
        isWaiting: true,
        waitingType: 'IN_PERSON',
        waitingNumber: 2,
        adultCount: 3,
        reviewRate: 2.5,
        mainImgUrl:
          'https://img.freepik.com/free-photo/tasty-food-arrangement-top-view_23-2149182261.jpg',
        createdAt: '2025-06-20T03:44:25.499Z',
      },
      {
        id: 2,
        storeId: 2,
        name: '바다풍경',
        isWaiting: true,
        waitingType: 'ONLINE',
        waitingNumber: 20,
        adultCount: 5,
        reviewRate: null,
        createdAt: '2025-03-20T03:44:25.499Z',
      },
      {
        id: 3,
        storeId: 3,
        name: '정육식당 흑돼지',
        isWaiting: false,
        adultCount: 2,
        reviewRate: null,
        mainImgUrl:
          'https://img.freepik.com/free-photo/tasty-food-arrangement-top-view_23-2149182261.jpg',
        createdAt: '2025-07-02T03:44:25.499Z',
      },
    ],
  },
};

export const mockWaitingDetailResponse: GetWaitingDetailResponse = {
  status: 'OK',
  data: {
    id: 1,
    storeId: 1,
    user: {
      id: 1,
      storeId: 1,
      name: '홍길동',
      phoneNumber: '01012345678',
      count: 1,
    },
    callNumber: 1,
    waitingNumber: 1,
    channel: 'IN_PERSON',
    infantChairCount: 1,
    infantCount: 1,
    adultCount: 1,
    memo: '아이 1명, 어른 3명입니다. 창가 자리 부탁드립니다.',
    createdAt: '2025-07-24T15:44:25.499Z',
  },
};
