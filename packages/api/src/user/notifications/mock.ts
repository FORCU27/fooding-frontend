import { GetNotificationListParams, GetNotificationListResponse, Notification } from './type';

export const mockNotificationListResponse = (
  params: GetNotificationListParams,
): GetNotificationListResponse => {
  const { page, size } = params;

  return {
    status: 'OK',
    data: {
      pageInfo: {
        pageNum: page,
        pageSize: size,
        totalCount: mockNotificationList.length,
        totalPages: Math.ceil(mockNotificationList.length / size),
      },
      list: mockNotificationList.slice((page - 1) * size, page * size),
    },
  };
};

const mockNotificationList: Notification[] = Array.from({ length: 80 }, (_, index) => ({
  id: index + 1,
  category: index % 3 === 0 ? 'EVENT' : index % 3 === 1 ? 'NOTICE' : 'SERVICE',
  title: index % 3 === 0 ? '이벤트' : index % 3 === 1 ? '공지사항' : '알림',
  content:
    index % 3 === 0
      ? '푸딩 동영상 리뷰 이벤트 당첨자 안내'
      : index % 3 === 1
        ? '푸딩 개인정보처리방침 개정 사전안내'
        : '홍길동님이 리뷰에 댓글을 남겼습니다.',
  sentAt: new Date().toISOString(),
  read: index === 0 ? false : true,
}));
