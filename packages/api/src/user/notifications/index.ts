export * from './type';

import { Notification } from './type';

// const ENDPOINT = '/user/notifications';

export const notificationApi = {
  getNotificationList: async () => {
    // const response = api.get(ENDPOINT);
    // return GetNotificationListResponse.parse(response);
    return {
      status: 'OK',
      data: dummyNotificationList,
    };
  },
};

const dummyNotificationList: Notification[] = [
  {
    id: 1,
    type: 'event',
    title: '이벤트',
    content: '푸딩 동영상 리뷰 이벤트 당첨자 안내',
    sentAt: '2025-05-18T02:58:06.381Z',
    read: false,
  },
  {
    id: 2,
    type: 'notice',
    title: '공지사항',
    content: '푸딩 개인정보처리방침 개정 사전안내',
    sentAt: '2025-05-18T02:58:06.381Z',
    read: true,
  },
];
